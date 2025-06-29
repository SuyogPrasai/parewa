import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
// import { sendNoticeNewsLetters } from "@/lib/emails/send-notice-newsletters-emails";
import { sendAnnouncementNewsLetters } from "@/lib/emails/send-annoucment-newsletters-email";
import { sendNotifications } from "@/lib/send-notification";

import { NoticeDB } from "@/types/post_objects/notice";
import { ArticleDB } from "@/types/post_objects/article";
import { AnnouncementDB } from "@/types/post_objects/announcement";

import NoticeModel from "@/models/Notice";
import ArticleModel from "@/models/Article";
import UserModel from "@/models/User";
import { User } from "@/models/User";
import AnnouncementModel from "@/models/Announcements";
import { parseHTML, stripHTML } from "@/lib/htmlParser";
import { notice_options } from "@/config/parsing-options";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.NEXT_WORDPRESS_API;
    await dbConnect(); // Ensure the database connection is established

    try {
        const SENT_API_KEY = request.headers.get("Authorization");

        // Authorization Check
        if (SENT_API_KEY !== API_KEY) {
            console.log("Unauthorized Access: API keys do not match");
            return NextResponse.json(
                { success: false, message: "Unauthorized Access: API keys do not match" },
                { status: 401 }
            );
        }

        let post_object: NoticeDB | ArticleDB;
        const requestBody = await request.json();

        console.log(requestBody);

        if (requestBody['type'] === "news") {
            post_object = {
                wp_id: requestBody['wp_id'],
                title: requestBody['title'],
                content: requestBody['content'],
                publishedIn: requestBody['publishedIn'],
                featuredImage: requestBody['featuredImage'],
                postTags: requestBody['postTags'],
                category: requestBody['category'],
                published_for: requestBody['published_for'],
            } as NoticeDB;
        } else if (requestBody['type'] === "article") {
            post_object = {
                wp_id: requestBody['wp_id'],
                title: requestBody['title'],
                content: requestBody['content'],
                oneLiner: requestBody['oneLiner'],
                publishedIn: requestBody['publishedIn'],
                featuredImage: requestBody['featuredImage'],
                postTags: requestBody['postTags'],
                author: requestBody['author_name'] || 'Anonymous',
                category: requestBody['category'],
            } as ArticleDB;
        } else if (requestBody['type'] === "announcement") {
            post_object = {
                wp_id: requestBody['wp_id'],
                title: requestBody['title'],
                content: requestBody['content'],
                publishedIn: requestBody['publishedIn'],
                category: requestBody['category'],
                link: requestBody['link'],
                author: requestBody['author_name'] || 'Anonymous',
                show: requestBody['show'],
            } as AnnouncementDB;
        }
        else {
            return NextResponse.json(
                { success: false, message: "Invalid type" },
                { status: 400 }
            );
        }

        if (requestBody['title'] === "Auto Draft") {
            return NextResponse.json(
                { success: false, message: "Auto Draft cannot be published" },
                { status: 400 }
            );
        }

        let publisher_id = "";
        if (requestBody['publisher'] !== "") {
            const user: User | null = await UserModel.findOne({ name: requestBody['publisher_name'] });
            if (!user) {
                console.error(`Publisher not found: ${requestBody['publisher_name']}`);
                return NextResponse.json(
                    { success: false, message: "Publisher not found" },
                    { status: 404 }
                );
            }
            publisher_id = user._id as string;
        }

        post_object.publisherID = publisher_id;

        // Handle events
        switch (requestBody['event']) {
            case "modified":
                await handleModifiedEvent(requestBody['type'], post_object.wp_id, post_object);
                console.log(`Post Modified with ID: ${post_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `${requestBody['type']} Modified with ID: ${post_object.wp_id}` },
                    { status: 200 }
                );

            case "published":
                await handlePublishedEvent(requestBody['type'], post_object.wp_id, post_object, requestBody['publisher_name']);
                console.log(`Post Published with ID: ${post_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `${requestBody['type']} Published with ID: ${post_object.wp_id}` },
                    { status: 200 }
                );

            case "trashed":
                await handleTrashedEvent(requestBody['type'], post_object.wp_id);
                console.log(`Post Trashed with ID: ${post_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `${requestBody['type']} Trashed with ID: ${post_object.wp_id}` },
                    { status: 200 }
                );

            case "deleted":
                await handleDeletedEvent(requestBody['type'], post_object.wp_id);
                console.log(`Post Deleted with ID: ${post_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `${requestBody['type']} Deleted with ID: ${post_object.wp_id}` },
                    { status: 200 }
                );

            case "post_restore":
                await handlePostRestoreEvent(requestBody['type'], post_object.wp_id);
                console.log(`Post Restored with ID: ${post_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `${requestBody['type']} Restored with ID: ${post_object.wp_id}` },
                    { status: 200 }
                );

            default:
                console.log(`Invalid Event Received: ${requestBody['event']}`);
                return NextResponse.json(
                    { success: false, message: `Invalid Event Received: ${requestBody['event']}` },
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error("Failed to handle the POST request:", error);
        return NextResponse.json(
            { success: false, message: `Failed to handle the POST request: ${error}` },
            { status: 500 }
        );
    }
}

// Helper functions for handling events
async function handleModifiedEvent(type: string, id: string, data: ArticleDB | NoticeDB | AnnouncementDB) {
    if (type === "article") {
        const {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            postTags,
            category,
            author,
            publisherID,
        } = data as ArticleDB;


        const createFields = {
            title,
            content,
            oneLiner,
            featuredImage,
            postTags,
            category: category.toLowerCase(),
            author,
            publisherID,
            link: "",
        };

        const article = await ArticleModel.findOneAndUpdate({ wp_id }, createFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            postTags,
            category,
            publisherID,
            published_for,
        } = data as NoticeDB;

        const createFields = {
            title,
            content,
            featuredImage,
            postTags,
            category: category.toLowerCase(),
            publisherID,
            published_for,
        };

        const notice = await NoticeModel.findOneAndUpdate({ wp_id }, createFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    } else if (type === "announcement") {

        const {
            wp_id,
            title,
            content,
            publishedIn,
            category,
            publisherID,
            link,
            show,
            author
        } = data as AnnouncementDB;

        const createFields = {
            title,
            content,
            category: category.toLowerCase(),
            publisherID,
            link,
            show,
            author
        };

        const announcement = await AnnouncementModel.findOneAndUpdate({ wp_id }, createFields, { new: true });
        if (!announcement) throw new Error("Failed to find the Announcement");
        return announcement;
    }
}

async function handlePublishedEvent(type: string, wp_id: string, data: ArticleDB | NoticeDB | AnnouncementDB, publisher_name: string) {
    if (type === "article") {
        const {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            postTags,
            category,
            author,
            publisherID,
        } = data as ArticleDB;

        const ArticleData = {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            publisherID,
            voteCount: 0,
            postTags,
            trashed: false,
            category: category.toLowerCase(),
            author
        };
        let article = await ArticleModel.create(ArticleData);

    } else if (type === "news") {
        const {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            postTags,
            category,
            publisherID,
            published_for,
        } = data as NoticeDB;

        const NoticeData = {
            wp_id,
            title,
            content,
            oneLiner,
            publishedIn,
            featuredImage,
            publisherID,
            voteCount: 0,
            postTags,
            trashed: false,
            category: category.toLowerCase(),
            published_for
        };

        let notice = await NoticeModel.create(NoticeData);
        const url = `${process.env.PAREWA_BASE_URI}/notices/notice?id=${notice.id}`;

        await sendNotifications({
            title: `परेवा_ Notice | ${notice.title} by ${publisher_name}`,
            body: stripHTML(notice.content || ""),
            url
        })

    } else if (type === "announcement") {
        const {
            wp_id,
            title,
            content,
            publishedIn,
            publisherID,
            category,
            link,
            show,
            author,
        } = data as AnnouncementDB;

        const AnnouncementData = {
            wp_id,
            title,
            content,
            publishedIn,
            publisherID,
            trashed: false,
            category: category.toLowerCase(),
            link,
            show,
            author,
        };
        let announcement = await AnnouncementModel.create(AnnouncementData);

        await sendNotifications({
            title: `परेवा_ Announcement | ${announcement.title} by ${publisher_name}`,
            body: stripHTML(announcement.content || ""),
        })

        await sendAnnouncementNewsLetters(announcement);
    }
}

async function handleTrashedEvent(type: string, wp_id: string) {
    const updateFields = { trashed: true };
    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}

async function handleDeletedEvent(type: string, wp_id: string) {
    if (type === "article") {
        const article = await ArticleModel.findOneAndDelete({ wp_id });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndDelete({ wp_id });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    } else if (type === "announcement") {
        const announcement = await AnnouncementModel.findOneAndDelete({ wp_id });
        if (!announcement) throw new Error("Failed to find the Announcement");
        return announcement;
    }
}

async function handlePostRestoreEvent(type: string, wp_id: string) {
    const updateFields = { trashed: false };
    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    } else if (type === "announcement") {
        const announcement = await AnnouncementModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
        if (!announcement) throw new Error("Failed to find the Announcement");
        return announcement;
    }
}
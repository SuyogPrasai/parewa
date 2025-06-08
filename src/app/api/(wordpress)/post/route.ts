import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import PostObject from "@/types/postObject";
import Notice from "@/types/post_objects/notice";
import Article from "@/types/post_objects/article";

import NoticeModel from "@/models/Notice";
import ArticleModel from "@/models/Article";
import { User } from "@/models/User";
import UserModel from "@/models/User";
import RoleModel from "@/models/Role";

const article_link = "articles/?id=";
const notice_link = "notices/notice?id=";

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

        let post_object: Notice | Article;
        const requestBody = await request.json();

        console.log(requestBody);

        if (requestBody['type'] === "news") {
            post_object = {
                wp_id: requestBody['wp_id'],
                title: requestBody['title'],
                content: requestBody['content'],
                publishedIn: requestBody['date'],
                featuredImage: requestBody['featured_image'],
                postTags: requestBody['tags'],
                category: requestBody['category'],
                publisher: [{}],  // initialize publisher array
            } as Notice;
        } else if (requestBody['type'] === "article") {
            post_object = {
                wp_id: requestBody['id'],
                title: requestBody['title'],
                content: requestBody['content'],
                oneLiner: requestBody['oneLiner'],
                publishedIn: requestBody['date'],
                featuredImage: requestBody['featured_image'],
                postTags: requestBody['tags'],
                author: requestBody['author_name'] || 'Anonymous',
                category: requestBody['category'],
                publisher: [{}]
            } as Article;
        } else {
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

        // Fetch publisher ID
        let publisher_id = "";
        let publisher_roleID = "";
        let publisher_name = "";
        let publisher_username = "";
        if (requestBody['publisher'] !== "") {
            const user: User | null = await UserModel.findOne({ username: requestBody['publisher'] });
            if (!user) {
                console.error(`Publisher not found: ${requestBody['publisher']}`);
                return NextResponse.json(
                    { success: false, message: "Publisher not found" },
                    { status: 404 }
                );
            }
            publisher_id = user._id as string;
            publisher_roleID = user.roleID;
            publisher_name = user.name;
            publisher_username = user.username;
        }

        const publisher_role = await RoleModel.findById(publisher_roleID); // await added here

        if (!publisher_role) {
            console.error(`Publisher role not found: ${publisher_roleID}`);
            return NextResponse.json(
                { success: false, message: "Publisher role not found" },
                { status: 404 }
            );
        }

        // Assign publisher details
        if (post_object.publisher && post_object.publisher[0]) {
            post_object.publisher[0].name = publisher_name;
            post_object.publisher[0].username = publisher_username;
            post_object.publisher[0].role = publisher_role.name;

            post_object.publisherID = publisher_id;
        }

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
                await handlePublishedEvent(requestBody['type'], post_object.wp_id, post_object);
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
            { success: false, message: `Failed to handle the POST request: ${error.message}` },
            { status: 500 }
        );
    }
}

// Helper functions for handling events
async function handleModifiedEvent(type: string, id: string, data: Article | Notice ) {
    if (type === "article") {
        const {
            title,
            content,
            oneLiner,
            featuredImage,
            postTags,
            category,
            author,
            publisherID 
        } = data as Article;

        const createFields = {
            title,
            content,
            oneLiner,
            featuredImage,
            postTags,
            category,
            author,
            publisherID,
        };

        const article = await ArticleModel.findOneAndUpdate({ id }, createFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const {
            title,
            content,
            featuredImage,
            postTags,
            category,
            publisherID 
        } = data as Notice;

        const createFields = {
            title,
            content,
            featuredImage,
            postTags,
            category,
            publisherID,
        }; 

        const notice = await NoticeModel.findOneAndUpdate({ id }, createFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}

async function handlePublishedEvent(type: string, id: string, data: PostObject) {
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
        } = data as Article;

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
            category,
            author
        };
        await ArticleModel.create(ArticleData);

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
            publisher
        } = data as Notice;

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
            category,
        };
        await NoticeModel.create(NoticeData);
    }
}

async function handleTrashedEvent(type: string, id: string) {
    const updateFields = { trashed: true };
    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}

async function handleDeletedEvent(type: string, id: string) {
    if (type === "article") {
        const article = await ArticleModel.findOneAndDelete({ id });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndDelete({ id });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}

async function handlePostRestoreEvent(type: string, id: string) {
    const updateFields = { trashed: false };
    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}
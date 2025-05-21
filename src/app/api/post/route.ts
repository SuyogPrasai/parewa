import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect";
import NoticeModel from "@/models/Notice";
import ArticleModel from "@/models/Article";
import UserModel from "@/models/User";
import PostObject from "@/types/postObject";

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

        let post_object = {} as PostObject;

        const requestBody = await request.json();
        if (requestBody['type'] === "news") {
            post_object = {
                id: requestBody['id'],
                title: requestBody['title'],
                content: requestBody['content'],
                type: requestBody['type'],
                publisher: requestBody['publisher'],
                date: requestBody['date'],
                modified: requestBody['modified'],
                tags: requestBody['tags'],
                event: requestBody['event'],
                featured_image: requestBody['featured_image'],
                category: requestBody['category']
            };
        } else if (requestBody['type'] === "article") {
            post_object = {
                id: requestBody['id'],
                title: requestBody['title'],
                content: requestBody['content'],
                type: requestBody['type'],
                publisher: requestBody['publisher'],
                date: requestBody['date'],
                modified: requestBody['modified'],
                tags: requestBody['tags'],
                event: requestBody['event'],
                featured_image: requestBody['featured_image'],
                author: requestBody['author'] ? requestBody['author'] : 'Anonymous',
                category: requestBody['category']
            };
        
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
        if (post_object.publisher !== "") {
            const user = await UserModel.findOne({ username: post_object.publisher });
            if (!user) {
                console.error(`Publisher not found: ${post_object.publisher}`);
                return NextResponse.json(
                    { success: false, message: "Publisher not found" },
                    { status: 404 }
                );
            }
            publisher_id = user._id as string; // Assign the ID if the user exists
        }

        // Add publisher_id to post_object
        post_object.publisherID = publisher_id;

        // Handle events
        switch (post_object.event) {
            case "modified":
                await handleModifiedEvent(post_object.type, post_object.id, post_object);
                console.log(`Post Modified with ID: ${post_object.id}`);
                return NextResponse.json(
                    { success: true, message: `${post_object.type} Modified with ID: ${post_object.id}` },
                    { status: 200 }
                );

            case "published":
                await handlePublishedEvent(post_object.type, post_object.id, post_object);
                console.log(`Post Published with ID: ${post_object.id}`);
                return NextResponse.json(
                    { success: true, message: `${post_object.type} Published with ID: ${post_object.id}` },
                    { status: 200 }
                );

            case "trashed":
                await handleTrashedEvent(post_object.type, post_object.id);
                console.log(`Post Trashed with ID: ${post_object.id}`);
                return NextResponse.json(
                    { success: true, message: `${post_object.type} Trashed with ID: ${post_object.id}` },
                    { status: 200 }
                );

            case "deleted":
                await handleDeletedEvent(post_object.type, post_object.id);
                console.log(`Post Deleted with ID: ${post_object.id}`);
                return NextResponse.json(
                    { success: true, message: `${post_object.type} Deleted with ID: ${post_object.id}` },
                    { status: 200 }
                );

            case "post_restore":
                await handlePostRestoreEvent(post_object.type, post_object.id);
                console.log(`Post Restored with ID: ${post_object.id}`);
                return NextResponse.json(
                    { success: true, message: `${post_object.type} Restored with ID: ${post_object.id}` },
                    { status: 200 }
                );

            default:
                console.log(`Invalid Event Received: ${post_object.event}`);
                return NextResponse.json(
                    { success: false, message: `Invalid Event Received: ${post_object.event}` },
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
async function handleModifiedEvent(type: string, id: string, data: PostObject) {
    if (type === "article") {
        const { 
            title, 
            content, 
            date, 
            featured_image, 
            tags, 
            modified, 
            category, 
            author, 
            publisherID } = data;

        const createFields = {
            title,
            content,
            publishedIn: date,
            featuredImage: featured_image,
            postTags: tags,
            modifiedIn: modified,
            publisherID,
            category,
            author
        };

        const article = await ArticleModel.findOneAndUpdate({ id }, createFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
        return article;
    } else if (type === "news") {
        const { title, content, date, featured_image, tags, modified, category, publisherID } = data;
        const createFields = {
            title,
            content,
            publishedIn: date,
            featuredImage: featured_image,
            postTags: tags,
            modifiedIn: modified,
            publisherID,
            category
        };
        const notice = await NoticeModel.findOneAndUpdate({ id }, createFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
        return notice;
    }
}

async function handlePublishedEvent(type: string, id: string, data: PostObject) {
    if (type === "article") {
        const { title, content, date, featured_image, tags, modified, category, author, publisherID } = data;
        const articleData = {
            id,
            title,
            content,
            publishedIn: date,
            featuredImage: featured_image,
            postTags: tags,
            modifiedIn: modified,
            publisherID,
            category,
            author
        };
        await ArticleModel.create(articleData);
    } else if (type === "news") {
        const { title, content, date, featured_image, tags, modified, category, publisherID } = data;
        const newsData = {
            id,
            title,
            content,
            publishedIn: date,
            featuredImage: featured_image,
            postTags: tags,
            modifiedIn: modified,
            publisherID,
            category
        };
        await NoticeModel.create(newsData);
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
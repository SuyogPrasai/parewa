import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnnect";

import NoticeModel from "@/models/Notice";
import ArticleModel from "@/models/Article";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
    const API_KEY = process.env.NEXT_WORDPRESS_API;
    await dbConnect(); // Ensure the database connection is established

    try {
        const SENT_API_KEY = request.headers.get("Authorization");

        // Authorization Check
        if (SENT_API_KEY !== API_KEY) {
            console.log(SENT_API_KEY)
            console.log(API_KEY)
            console.log("Unauthorized Access: API keys do not match");
            return NextResponse.json(
                { success: false, message: "Unauthorized Access: API keys do not match" },
                { status: 401 }
            );
        }

        const { id, title, content, type, author, date, modified, tags, featured_image, event } = await request.json();
        if (title == "Auto Draft") {
            console.log("Auto Draft cannot be published");
            return NextResponse.json(
                { success: false, message: "Auto Draft cannot be published" },
                { status: 400 }
            )
        }
        // const shit = await request.json();
        // console.log(shit);

        // Fetch author ID
        let author_id: string = ""; // Declare author_id at the top

        if (author !== "") {
            const user = await UserModel.findOne({ username: author });
            if (!user) {
                console.log(author);
                console.error("Author not found");
                return NextResponse.json(
                    { success: false, message: "Author not found" },
                    { status: 404 }
                );
            }
            author_id = user._id as string; // Assign the ID if the user exists
        }


        // Handle events
        // console.log(event)
        switch (event) {
            case "modified":
                await handleModifiedEvent(type, id, { title, content, featured_image, tags, modified, author_id });
                console.log(`Post Modified with ID: ${id}`);
                return NextResponse.json(
                    { success: true, message: `${type} Modified with ID: ${id}` },
                    { status: 200 }
                );
                break;

            case "published":
                await handlePublishedEvent(type, id, { title, content, date, featured_image, tags, modified, author_id });
                console.log(`Post Published with ID: ${id}`);
                return NextResponse.json(
                    { success: true, message: `${type} Published with ID: ${id}` },
                    { status: 200 }
                );
                break;

            case "trashed":
                await handleTrashedEvent(type, id);
                console.log(`Post Trashed with ID: ${id}`);
                return NextResponse.json(
                    { success: true, message: `${type} Trashed with ID: ${id}` },
                    { status: 200 }
                );
                break;

            default:
                console.log("Invalid Event Received: " + event);
                return NextResponse.json(
                    { success: false, message: "Invalid Event Received: " + event },
                    { status: 400 }
                );
                break;
        }
    } catch (error: any) {
        console.error("Failed to handle the POST request:", error);
        return NextResponse.json(
            { success: false, message: "Failed to handle the POST request: " + error.message },
            { status: 500 }
        );
    }
}

// Helper functions for handling events
async function handleModifiedEvent(type: string, id: string, data: any) {
    const { title, content, featured_image, tags, modified, author_id } = data;
    const updateFields = {
        title,
        content,
        featuredImage: featured_image,
        postTags: tags,
        modifiedIn: modified,
        author: author_id,
    };

    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!article) throw new Error("Failed to find the Article");
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ id }, updateFields, { new: true });
        if (!notice) throw new Error("Failed to find the Notice");
    }
}

async function handlePublishedEvent(type: string, id: string, data: any) {
    const { title, content, date, featured_image, tags, modified, author_id } = data;
    const createFields = {
        id,
        title,
        content,
        publishedIn: date,
        featuredImage: featured_image,
        authorID: author_id,
        postTags: tags,
        modifiedIn: modified,
    };

    if (type === "article") {
        await ArticleModel.create(createFields);
    } else if (type === "news") {
        await NoticeModel.create(createFields);
    }
}

async function handleTrashedEvent(type: string, id: string) {
    const updateFields = { trashed: true };

    if (type === "article") {
        const article = await ArticleModel.findOneAndUpdate({ id }, updateFields);
        if (!article) throw new Error("Failed to find the Article");
    } else if (type === "news") {
        const notice = await NoticeModel.findOneAndUpdate({ id }, updateFields);
        if (!notice) throw new Error("Failed to find the Notice");
    }
}
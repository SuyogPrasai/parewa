import dbConnect from "@/lib/dbConnnect";

import { NextResponse, NextRequest } from "next/server";
import NoticeModel from "@/models/Notice";
import UserModel, { User } from "@/models/User"; // Assuming you have a User model

import { Types } from "mongoose"; // Import Mongoose types

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    let category_ = searchParams.get("category");

    if (!category_) {
        console.log("Category is required.");
        return NextResponse.json({ success: false, message: "Category is required" }, { status: 400 });
    }

    const notice = await NoticeModel.findOne({ category: category_ });
    if (!notice) {
        return NextResponse.json(
            { success: false, message: "Category Does Not Exist" },
            { status: 200 }
        );
    }

    try {
        const notices = await NoticeModel.aggregate([
            { $match: { trashed: false, category: category_ } }, // Filter out trashed notices
            { $sort: { createdAt: -1 } },   // Sort by latest createdAt
            { $limit: 4 }                   // Get only 4 latest notices
        ]);

        if (notices.length === 0) {
            return NextResponse.json(
                { success: true, message: "No notices found" },
                { status: 200 }
            );
        }

        // Fetch usernames for notices
        const userIds = notices.map((notice: { publisherID: Types.ObjectId }) => notice.publisherID);
        const users = await UserModel.find(
            { _id: { $in: userIds } },
            { _id: 1, username: 1 }
        );

        const userMap: Record<string, string> = Object.fromEntries(
            users.map((user: User) => [(user._id as Types.ObjectId).toString(), user.username])
        );

        // Transform notices with summarized description and usernames
        const transformedNotices = notices.map((notice: any) => ({
            ...notice,
            content: summarizeText(notice.content), // Summarize description
            username: userMap[notice.publisherID.toString()] || "Unknown" // Get username
        }));

        return NextResponse.json(
            { success: true, notices: transformedNotices },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching notices from the database:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching notices from the server" },
            { status: 400 }
        );
    }
}

// Function to strip HTML and limit text length to max 20 words
function summarizeText(htmlString: string): string {
    const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim(); // Remove HTML
    const words = text.split(/\s+/); // Split by whitespace
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}

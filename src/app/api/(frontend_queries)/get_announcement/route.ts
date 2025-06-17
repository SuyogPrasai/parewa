import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AnnouncementModel from "@/models/Announcements";
import Announcement, { AnnouncementDB } from "@/types/post_objects/announcement";
import { article_options } from "@/config/parsing-options";
import { parseHTML } from "@/lib/htmlParser";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const announcement: AnnouncementDB | null = await AnnouncementModel
            .findOne({ show: true })
            .sort({ publishedIn: -1 })
            .limit(1);

        if (!announcement) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No active announcement found",
                },
                { status: 404 }
            );
        }

        const parsed_html = await parseHTML(announcement.content || "", article_options);

        const response_announcement: Announcement = {
            _id: announcement._id,
            wp_id: announcement.wp_id,
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            publishedIn: announcement.publishedIn,
            publisherID: announcement.publisherID,
            link: announcement.link,
            author: announcement.author,
            show: announcement.show,
            postTags: announcement.postTags,
        };

        return NextResponse.json(
            {
                success: true,
                announcement: response_announcement,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching announcement from the database:", error.message, error.stack);
        return NextResponse.json(
            {
                success: false,
                message: "Error getting announcement",
            },
            { status: 400 }
        );
    }
}
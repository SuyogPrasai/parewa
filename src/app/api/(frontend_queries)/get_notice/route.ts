import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import NoticeModel from "@/models/Notice"; // Changed from ArticleModel
import UserModel, { User } from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

import Notice, { NoticeDB } from "@/types/post_objects/notice";


import { parseHTML } from "@/lib/htmlParser";
import { notice_options } from "@/config/parsing-options";

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const notice: NoticeDB | null = await NoticeModel.findById(id); // Changed from article

        if (!notice) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Notice not found", // Changed message
                },
                { status: 404 }
            );
        }

        // Publisher Details (assuming notices also have a publisher)
        const publisher = await UserModel.findById(notice.publisherID); // Changed from article.publisherID

        if (!publisher) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Publisher not found", // Changed message
                },
                { status: 404 }
            );
        }

        const publisher_name = publisher.name;
        const publisher_username = publisher.username;
        const publisher_roleID = publisher.roleID;

        const role = await RoleModel.findById(publisher_roleID);
        const parsed_html = await parseHTML(notice.content || "", notice_options); // Changed from article.content

        let position_name = null

        if (role?.name.toLocaleLowerCase() === "author") {
            const publisher_positionID = publisher.positionID;
            const publisher_position = await PositionModel.findById(publisher_positionID);
            position_name = publisher_position?.name;
        }

        const response_notice_: Notice = { // Changed variable name
            '_id': notice._id,
            'wp_id': notice.wp_id,
            'title': notice.title,
            'content': parsed_html,
            'publishedIn': notice.publishedIn,
            'featuredImage': notice.featuredImage, // Assuming notices might have a featured image
            'publisherID': notice.publisherID,
            'voteCount': notice.voteCount,       // Assuming notices might have vote count
            'postTags': notice.postTags,         // Assuming notices might have tags
            'updatedAt': notice.updatedAt,
            'category': notice.category,
            'link': notice.link,
            'publisher': [{
                'name': publisher_name,
                'username': publisher_username,
                'role': role?.name || "",
                'position': position_name || ""
            }],
        };


        return NextResponse.json(
            {
                success: true,
                notice: response_notice_, // Changed from article
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error fetching notices from the database:", error.message, error.stack); // Changed message
        return NextResponse.json(
            {
                success: false,
                message: "Error getting notices", // Changed message
            },
            { status: 400 }
        );
    }
}
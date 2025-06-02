import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import NoticeModel from "@/models/Notice"; // Changed from ArticleModel
import UserModel, { User } from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

import { parseHTML } from "@/lib/htmlParser";
import options from "@/lib/parsing_options";

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const notice = await NoticeModel.findById(id); // Changed from article

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
        const parsed_html = await parseHTML(notice.content || "", options); // Changed from article.content

        const response_notice_: any = { // Changed variable name
            '_id': notice._id,
            'title': notice.title,
            'content': parsed_html,
            'publishedIn': notice.publishedIn,
            'featuredImage': notice.featuredImage, // Assuming notices might have a featured image
            'voteCount': notice.voteCount,       // Assuming notices might have vote count
            'postTags': notice.postTags,         // Assuming notices might have tags
            'publisher': {
                '_id': publisher._id,
                'name': publisher_name,
                'username': publisher_username,
                'role': role?.name,
            }
        };

        if (role?.name.toLocaleLowerCase() === "student") {
            response_notice_.publisher.rollNumber = publisher.rollNumber;
        } else {
            const publisher_positionID = publisher.positionID;
            const publisher_position = await PositionModel.findById(publisher_positionID);
            response_notice_.publisher.position = publisher_position?.name;
        }

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
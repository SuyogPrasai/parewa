import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import ArticleModel from "@/models/Article";
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

        const article = await ArticleModel.findById(id);

        if (!article) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Article not found",
                },
                { status: 404 }
            );
        }

        // Author Details
        const publisher = await UserModel.findById(article.publisherID);
        
        if (!publisher) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Author not found",
                },
                { status: 404 }
            );
        }

        const publisher_name = publisher.name
        const publisher_username = publisher.username
        const publisher_roleID  = publisher.roleID
        
        const role = await RoleModel.findById(publisher_roleID);
        const parsed_html = await parseHTML(article.content || "", options);

        const response_article_: any = {
            '_id': article._id,
            'title': article.title,
            'content': parsed_html,
            'publishedIn': article.publishedIn,
            'featuredImage': article.featuredImage,
            'voteCount': article.voteCount,
            'postTags': article.postTags,
            'author': article.author,
            'publisher': {
                '_id': publisher._id,
                'name': publisher_name,
                'username': publisher_username,
                'role': role?.name,
            }
        };

        if (role?.name.toLocaleLowerCase() === "student") {
            response_article_.publisher.rollNumber = publisher.rollNumber;
        } else {
            const publisher_positionID = publisher.positionID;
            const publisher_position = await PositionModel.findById(publisher_positionID);
            response_article_.publisher.position = publisher_position?.name;
        }

        return NextResponse.json(
            {
                success: true,
                article: response_article_,
            },
            { status: 200 }
        );
        

    } catch (error: any) {
        console.error("Error fetching articles from the database:", error.message, error.stack);
        return NextResponse.json(
            {
                success: false,
                message: "Error getting articles",
            },
            { status: 400 }
        );
    }
}

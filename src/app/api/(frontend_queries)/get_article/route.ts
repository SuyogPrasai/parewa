import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import ArticleModel from "@/models/Article";
import UserModel, { User } from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

import { parseHTML } from "@/lib/htmlParser";
import { article_options } from "@/config/parsing-options";
import Article from "@/types/post_objects/article";

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
        const parsed_html = await parseHTML(article.content || "", article_options);
    

        let position_name = null

          if (role?.name.toLocaleLowerCase() === "author") {
            const publisher_positionID = publisher.positionID;
            const publisher_position = await PositionModel.findById(publisher_positionID);
            position_name = publisher_position?.name;
        }

        const response_article_: Article = {
            '_id': article._id,
            'wp_id': article.wp_id,
            'title': article.title,
            'oneLiner': article.oneLiner,
            'content': parsed_html,
            'publishedIn': article.publishedIn,
            'featuredImage': article.featuredImage,
            'publisherID': article.publisherID,
            'voteCount': article.voteCount,
            'postTags': article.postTags,
            'updatedAt': article.updatedAt,
            'category': article.category,
            'author': article.author,
            'link': article.link,
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

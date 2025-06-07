import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import Article from "@/types/post_objects/article";
import { ArticleDB } from "@/types/post_objects/article";

import ArticleModel from "@/models/Article";
import UserModel, { User } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const articles = await ArticleModel.aggregate<ArticleDB>([
      { $match: { trashed: false } }, // Filter out trashed articles
      { $sort: { createdAt: -1 } }, // Sort by latest createdAt
      { $limit: 6 }, // Limit to 6 articles
      {
        $lookup: {
          from: 'users', // Matches UserSchema collection name
          let: { publisherId: { $toObjectId: '$publisherID' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$publisherId'] } } }
          ],
          as: 'publisher'
        }
      },
    ]);

    const transformed_articles: Article[] = articles.map((article) => ({
      wp_id: article.wp_id,
      title: article.title,
      oneLiner: article.oneLiner,
      publishedIn: article.publishedIn,
      featuredImage: article.featuredImage,
      publisherID: article.publisherID,
      voteCount: article.voteCount,
      postTags: article.postTags,
      modifiedIn: article.modifiedIn,
      category: article.category,
      author: article.author,
      link: article.link,
      publisher: [
        {
          name: article.publisher?.[0]?.name || "",
          username: article.publisher?.[0]?.username || "",
        }
      ]
    }))

    return NextResponse.json(
      { 
        success: true, 
        message: "Articles fetched successfully",
        articles: transformed_articles,
      },
      { status: 200 }
    );
  }
  catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error getting articles",
        error: error.message,
      },
      { status: 500 } // Changed to 500 for server-side errors
    );
  }
}
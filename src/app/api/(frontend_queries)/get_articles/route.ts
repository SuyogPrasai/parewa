import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ArticleModel from "@/models/Article";

import UserModel, { User } from "@/models/User";
import { Types } from "mongoose";
import Article, { ArticleDB } from "@/types/post_objects/article";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");

  try {
    let matchConditions: any = {
      trashed: false,
      category: category_,
    };

    if (query_) {
      matchConditions.$or = [
        { title: { $regex: query_, $options: "i" } },
        { content: { $regex: query_, $options: "i" } },
      ];
    }

    if (date_) {
      const selectedDate = new Date(date_);
      selectedDate.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setUTCDate(selectedDate.getUTCDate() + 1);

      matchConditions.createdAt = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    const totalArticles = await ArticleModel.countDocuments(matchConditions);
    const totalPages = Math.ceil(totalArticles / limit_);
    const skip = (page_ - 1) * limit_;

    const articles = await ArticleModel.aggregate([
      { $match: matchConditions },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
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

    if (articles.length === 0) {
      const message =
        totalArticles === 0
          ? "No articles found for this category."
          : "No articles found for this page.";
      return NextResponse.json(
        {
          success: true,
          message,
          articles: [],
          totalPages,
          currentPage: page_,
          totalArticles,
        },
        { status: 200 }
      );
    }

    const transformed_articles: Article[] = articles.map((article) => ({
      _id: article._id,
      wp_id: article.wp_id,
      title: article.title,
      oneLiner: article.oneLiner,
      publishedIn: article.publishedIn,
      featuredImage: article.featuredImage,
      publisherID: article.publisherID,
      voteCount: article.voteCount,
      postTags: article.postTags,
      updatedAt: article.updatedAt,
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
        articles: transformed_articles,
        totalPages,
        currentPage: page_,
        totalArticles,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching articles:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting articles",
        error: error.message,
      },
      { status: 400 }
    );
  }
}
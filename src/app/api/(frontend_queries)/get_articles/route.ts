import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import ArticleModel from "@/models/Article";

import Article, { ArticleDB } from "@/types/post_objects/article";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";
import { article_link } from "@/config/site-config";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");
  const top_articles_ = searchParams.get("top_articles"); // This will be "true" or null

  try {
    let matchConditions: any = {
      trashed: false,
    };

    if (category_) {
      matchConditions.category = category_;
    }

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

    let sortStage: { [key: string]: 1 | -1 } = { createdAt: -1 }; // Default sort

    if (top_articles_ === "true") { // Check if top_articles_ is explicitly "true"
      sortStage = { voteCount: -1 }; // Sort by voteCount in descending order
    }

    const articles = await ArticleModel.aggregate([
      { $match: matchConditions },
      { $sort: sortStage }, // Use the dynamically determined sort stage
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
      {
        $addFields: { // Ensure publisher is an object and not an array for easier access
          publisher: { $arrayElemAt: ["$publisher", 0] }
        }
      }
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

    const transformed_articles: Article[] = await Promise.all(
      articles.map(async (article) => {
        let role_name = "";
        let position_name = "";

        if (article.publisher?.roleID) {
          const role = await RoleModel.findById(article.publisher.roleID);
          role_name = role?.name || "";
        }

        if (role_name.toLocaleLowerCase() === "author" && article.publisher?.positionID) {
          const publisher_position = await PositionModel.findById(article.publisher.positionID);
          position_name = publisher_position?.name || "";
        }
      
        const link = article_link + article._id
        
        return {
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
          link: link,
          publisher: [
            {
              name: article.publisher?.name || "",
              username: article.publisher?.username || "",
              role: role_name,
              position: position_name,
            },
          ],
        };
      })
    );

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
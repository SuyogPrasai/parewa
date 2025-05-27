import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect";
import ArticleModel from "@/models/Article";
import UserModel, { User } from "@/models/User";
import { Types } from "mongoose";

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

    const userIds = articles.map(
      (article: { publisherID: Types.ObjectId }) => article.publisherID
    );
    const users = await UserModel.find(
      { _id: { $in: userIds } },
      { _id: 1, username: 1 }
    );

    const userMap: Record<string, string> = Object.fromEntries(
      users.map((user: User) => [
        (user._id as Types.ObjectId).toString(),
        user.username,
      ])
    );

    const transformedArticles = articles.map((article: any) => ({
      title: article.title,
      subtitle: summarizeText(article.content),
      link: `/articles/article?id=${article._id}`,
      image: article.featuredImage || "", // adjust if field differs
      author: userMap[article.publisherID.toString()] || "Unknown",
      date: article.createdAt,
    }));

    return NextResponse.json(
      {
        success: true,
        articles: transformedArticles,
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

function summarizeText(htmlString: string): string {
  const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const words = text.split(/\s+/);
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}

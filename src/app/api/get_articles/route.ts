import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect";
import ArticleModel from "@/models/Article";
import extractFirst15Words from "@/helpers/extractFiffteenWords";
import UserModel, { User } from "@/models/User";
import { Types } from "mongoose";


export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || '1', 10);
  const limit_ = parseInt(searchParams.get("limit") || '8', 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date"); // Get date string, will be null if not present

  try {
    let matchConditions: any = {
      trashed: false,
      category: category_,
    };

    // Add query condition for searching in title or content if query_ exists
    if (query_) {
      matchConditions.$or = [
        { title: { $regex: query_, $options: 'i' } },
        { content: { $regex: query_, $options: 'i' } },
      ];
    }

    // Add date condition ONLY if date_ is provided
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
      { $match: matchConditions }, // Use the dynamic match conditions
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
    ]);

    if (articles.length === 0 && totalArticles === 0) {
      return NextResponse.json(
        { success: true, message: "No articles found for this category.", articles: [], totalPages: 0, currentPage: page_, totalArticles: 0 },
        { status: 200 }
      );
    } else if (articles.length === 0 && totalArticles > 0) {
      return NextResponse.json(
        { success: true, message: "No articles found for this page.", articles: [], totalPages: totalPages, currentPage: page_, totalArticles: totalArticles },
        { status: 200 }
      );
    }

    const userIds = articles.map((article: { publisherID: Types.ObjectId }) => article.publisherID);
    const users = await UserModel.find(
      { _id: { $in: userIds } },
      { _id: 1, username: 1 }
    );

    const userMap: Record<string, string> = Object.fromEntries(
      users.map((user: User) => [(user._id as Types.ObjectId).toString(), user.username])
    );

    const transformedArticles = articles.map((article: any) => ({
      ...article,
      content: summarizeText(article.content),
      username: userMap[article.publisherID.toString()] || "Unknown"
    }));

    return NextResponse.json(
      { success: true, articles: transformedArticles, totalPages, currentPage: page_, totalArticles },
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
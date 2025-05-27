import dbConnect from "@/lib/dbConnnect";
import { NextResponse, NextRequest } from "next/server";
import NoticeModel from "@/models/Notice";
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

  if (!category_) {
    return NextResponse.json(
      { success: false, message: "Category is required" },
      { status: 400 }
    );
  }

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

    const totalNotices = await NoticeModel.countDocuments(matchConditions);
    const totalPages = Math.ceil(totalNotices / limit_);
    const skip = (page_ - 1) * limit_;

    const notices = await NoticeModel.aggregate([
      { $match: matchConditions },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
    ]);

    if (notices.length === 0) {
      const message =
        totalNotices === 0
          ? "No notices found for this category."
          : "No notices found for this page.";
      return NextResponse.json(
        {
          success: true,
          message,
          notices: [],
          totalPages,
          currentPage: page_,
          totalNotices,
        },
        { status: 200 }
      );
    }

    const userIds = notices.map((notice: { publisherID: Types.ObjectId }) => notice.publisherID);
    const users = await UserModel.find(
      { _id: { $in: userIds } },
      { _id: 1, username: 1 }
    );

    const userMap: Record<string, string> = Object.fromEntries(
      users.map((user: User) => [(user._id as Types.ObjectId).toString(), user.username])
    );

    const transformedNotices = notices.map((notice: any) => ({
      _id: notice._id.toString(),
      title: notice.title,
      content: summarizeText(notice.content),
      publishedIn: notice.publishedIn,
      postTags: notice.postTags,
      voteCount: notice.voteCount,
      link: `/notice/${notice._id}`,
      author: userMap[notice.publisherID.toString()] || "Unknown",
    }));

    return NextResponse.json(
      {
        success: true,
        notices: transformedNotices,
        totalPages,
        currentPage: page_,
        totalNotices,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching notices:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching notices from the server",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

function summarizeText(htmlString: string): string {
  const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const words = text.split(/\s+/);
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}

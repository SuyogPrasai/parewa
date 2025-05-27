import dbConnect from "@/lib/dbConnnect";
import { NextResponse, NextRequest } from "next/server";
import NoticeModel from "@/models/Notice";
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

  if (!category_) {
    return NextResponse.json({ success: false, message: "Category is required" }, { status: 400 });
  }

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

    // Get total count of notices based on all filters
    const totalNotices = await NoticeModel.countDocuments(matchConditions);

    const totalPages = Math.ceil(totalNotices / limit_);
    const skip = (page_ - 1) * limit_;

    const notices = await NoticeModel.aggregate([
      { $match: matchConditions }, // Use the dynamic match conditions
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
    ]);

    if (notices.length === 0 && totalNotices === 0) {
      return NextResponse.json(
        { success: true, message: "No notices found for this category.", notices: [], totalPages: 0, currentPage: page_, totalNotices: 0 },
        { status: 200 }
      );
    } else if (notices.length === 0 && totalNotices > 0) {
        return NextResponse.json(
            { success: true, message: "No notices found for this page.", notices: [], totalPages: totalPages, currentPage: page_, totalNotices: totalNotices },
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
      ...notice,
      content: summarizeText(notice.content),
      username: userMap[notice.publisherID.toString()] || "Unknown"
    }));

    return NextResponse.json(
      { success: true, notices: transformedNotices, totalPages, currentPage: page_, totalNotices },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching notices from the database:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching notices from the server" },
      { status: 500 }
    );
  }
}

// Function to strip HTML and limit text length to max 20 words
function summarizeText(htmlString: string): string {
  const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const words = text.split(/\s+/);
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}
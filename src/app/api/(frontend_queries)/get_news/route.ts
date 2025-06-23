import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import dbConnect from "@/lib/dbConnect";

import NoticeModel from "@/models/Notice";
import RoleModel from "@/models/Role";

import Notice from "@/types/post_objects/notice";
import PositionModel from "@/models/Positions";
import { notice_link } from "@/config/site-config";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");
  const excluding = searchParams.get("excluding");

  try {
    let matchConditions: any = {
      trashed: false,
    };

    // Only add category filter if category is provided
    if (category_) {
      matchConditions.category = category_;
    }

    // Handle excluding parameter
    if (excluding) {
      const excludeIds = excluding.split(',').map(id => id.trim());
      const validObjectIds = excludeIds
        .filter(id => ObjectId.isValid(id))
        .map(id => new ObjectId(id));
      
      if (validObjectIds.length > 0) {
        matchConditions._id = { $nin: validObjectIds };
      }
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

    const totalNotices = await NoticeModel.countDocuments(matchConditions);
    const totalPages = Math.ceil(totalNotices / limit_);
    const skip = (page_ - 1) * limit_;

    const notices = await NoticeModel.aggregate([
      { $match: matchConditions },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit_ },
      {
        $lookup: {
          from: "users", // Matches UserSchema collection name
          let: { publisherId: { $toObjectId: "$publisherID" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$publisherId"] } } },
            { $project: { name: 1, username: 1, _id: 0 } },
          ],
          as: "publisher",
        },
      },
    ]);

    if (notices.length === 0) {
      const message =
        totalNotices === 0
          ? category_ 
            ? "No notices found for this category."
            : "No notices found."
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

    const role = await RoleModel.findById(notices[0].publisher?.[0]?.roleID)
    const role_name = role?.name

    let position_name = null

    if (role?.name.toLocaleLowerCase() === "author") {
      const publisher_positionID = notices[0].publisher.positionID;
      const publisher_position = await PositionModel.findById(publisher_positionID);
      position_name = publisher_position?.name;
    }

    const transformed_notices: Notice[] = notices.map((notice: any) => {

     const link = notice_link + notice._id  

      return {
        _id: notice._id,
        wp_id: notice.wp_id,
        title: notice.title,
        content: summarizeText(notice.content),
        publishedIn: notice.publishedIn,
        featuredImage: notice.featuredImage,
        publisherID: notice.publisherID,
        published_for: notice.published_for,
        voteCount: notice.voteCount,
        postTags: notice.postTags,
        updatedAt: notice.updatedAt,
        category: notice.category,
        link: link,
        publisher: [
          {
            name: notice.publisher?.[0]?.name || "",
            username: notice.publisher?.[0]?.username || "Unknown",
            role: role_name || "",
            position: position_name || "",
          },
        ],
      }
    });

    return NextResponse.json(
      {
        success: true,
        notices: transformed_notices,
        totalPages,
        currentPage: page_,
        totalNotices,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching notices:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting notices",
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
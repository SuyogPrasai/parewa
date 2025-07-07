import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

import NoticeModel from "@/models/Notice";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";
import { notice_link } from "@/config/site-config";
import Notice from "@/types/post_objects/notice";

export async function getNoticesHandler(searchParams: URLSearchParams) {
  await dbConnect();

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");
  const excluding = searchParams.get("excluding");

  let matchConditions: any = {
    trashed: false,
  };

  if (category_) matchConditions.category = category_;

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
      { postTags: { $regex: query_, $options: "i" } },
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
        from: "users",
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

    return {
      success: true,
      message,
      notices: [],
      totalPages,
      currentPage: page_,
      totalNotices,
    };
  }

  const role = await RoleModel.findById(notices[0].publisher?.[0]?.roleID);
  const role_name = role?.name;
  let position_name = null;

  if (role?.name.toLowerCase() === "author") {
    const publisher_positionID = notices[0].publisher.positionID;
    const publisher_position = await PositionModel.findById(publisher_positionID);
    position_name = publisher_position?.name;
  }

  const transformed_notices: Notice[] = notices.map((notice: any) => {
    const link = notice_link + notice._id;

    return {
      _id: notice._id.toString(),
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
      link,
      publisher: [
        {
          name: notice.publisher?.[0]?.name || "",
          username: notice.publisher?.[0]?.username || "Unknown",
          role: role_name || "",
          position: position_name || "",
        },
      ],
    };
  });

  return {
    success: true,
    notices: transformed_notices,
    totalPages,
    currentPage: page_,
    totalNotices,
  };
}

function summarizeText(htmlString: string): string {
  const text = htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const words = text.split(/\s+/);
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
}

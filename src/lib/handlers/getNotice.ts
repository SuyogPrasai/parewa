import dbConnect from "@/lib/dbConnect";

import NoticeModel from "@/models/Notice";
import UserModel from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

import { parseHTML } from "@/lib/htmlParser";
import { notice_options } from "@/config/parsing-options";
import { notice_link } from "@/config/site-config";

import Notice, { NoticeDB } from "@/types/post_objects/notice";

export async function getNoticeByIdHandler(id: string) {
  await dbConnect();

  const notice: NoticeDB | null = await NoticeModel.findById(id);
  if (!notice) {
    return {
      success: false,
      message: "Notice not found",
      status: 404,
    };
  }

  const publisher = await UserModel.findById(notice.publisherID);
  if (!publisher) {
    return {
      success: false,
      message: "Publisher not found",
      status: 404,
    };
  }

  const publisher_name = publisher.name;
  const publisher_username = publisher.username;
  const publisher_roleID = publisher.roleID;

  const role = await RoleModel.findById(publisher_roleID);
  const parsed_html = await parseHTML(notice.content || "", notice_options);

  let position_name = null;
  if (role?.name.toLowerCase() === "author") {
    const publisher_positionID = publisher.positionID;
    const publisher_position = await PositionModel.findById(publisher_positionID);
    position_name = publisher_position?.name;
  }

  const link = notice_link + notice._id;

  const response_notice_: Notice = {
    _id: notice._id.toString(),
    wp_id: notice.wp_id,
    title: notice.title,
    content: parsed_html,
    publishedIn: notice.publishedIn,
    featuredImage: notice.featuredImage,
    publisherID: notice.publisherID,
    voteCount: notice.voteCount,
    postTags: notice.postTags,
    updatedAt: notice.updatedAt,
    category: notice.category,
    published_for: notice.published_for,
    link: link,
    publisher: [
      {
        name: publisher_name,
        username: publisher_username,
        role: role?.name || "",
        position: position_name || "",
      },
    ],
  };

  return {
    success: true,
    notice: response_notice_,
    status: 200,
  };
}

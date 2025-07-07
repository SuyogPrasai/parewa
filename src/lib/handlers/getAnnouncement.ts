import dbConnect from "@/lib/dbConnect";
import AnnouncementModel from "@/models/Announcements";
import { parseHTML } from "@/lib/htmlParser";
import { article_options } from "@/config/parsing-options";
import Announcement, { AnnouncementDB } from "@/types/post_objects/announcement";

export async function getActiveAnnouncementHandler() {
  await dbConnect();

  const announcement: AnnouncementDB | null = await AnnouncementModel
    .findOne({ show: true })
    .sort({ publishedIn: -1 })
    .limit(1);

  if (!announcement) {
    return {
      success: true,
      message: "No active announcement found",
      status: 200,
    };
  }

  const parsed_html = await parseHTML(announcement.content || "", article_options);

  const response_announcement: Announcement = {
    _id: announcement._id,
    wp_id: announcement.wp_id,
    title: announcement.title,
    content: parsed_html,
    category: announcement.category,
    publishedIn: announcement.publishedIn,
    publisherID: announcement.publisherID,
    link: announcement.link,
    author: announcement.author,
    show: announcement.show,
    postTags: announcement.postTags,
  };

  return {
    success: true,
    announcement: response_announcement,
    status: 200,
  };
}

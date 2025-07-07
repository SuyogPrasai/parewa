import dbConnect from "@/lib/dbConnect";
import ArticleModel from "@/models/Article";
import UserModel from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";
import { parseHTML } from "@/lib/htmlParser";
import { article_options } from "@/config/parsing-options";
import Article from "@/types/post_objects/article";
import { article_link } from "@/config/site-config";

export async function getSingleArticleHandler(id: string) {
  await dbConnect();

  const article = await ArticleModel.findById(id);
  if (!article) {
    return {
      success: false,
      message: "Article not found",
      status: 404,
    };
  }

  const publisher = await UserModel.findById(article.publisherID);
  if (!publisher) {
    return {
      success: false,
      message: "Author not found",
      status: 404,
    };
  }

  const parsed_html = await parseHTML(article.content || "", article_options);
  const role = await RoleModel.findById(publisher.roleID);

  let position_name: string | null = null;
  if (role?.name.toLowerCase() === "author") {
    const position = await PositionModel.findById(publisher.positionID);
    position_name = position?.name || null;
  }

  const link = article_link + article._id;

  const response_article_: Article = {
    _id: article._id.toString(),
    wp_id: article.wp_id,
    title: article.title,
    oneLiner: article.oneLiner,
    content: parsed_html,
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
        name: publisher.name,
        username: publisher.username,
        role: role?.name || "",
        position: position_name || "",
      },
    ],
  };

  return {
    success: true,
    article: response_article_,
    status: 200,
  };
}

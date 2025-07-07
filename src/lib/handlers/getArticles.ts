import dbConnect from "@/lib/dbConnect";
import ArticleModel from "@/models/Article";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";
import { article_link } from "@/config/site-config";
import { ObjectId } from "mongodb";
import Article from "@/types/post_objects/article";

export async function getArticlesHandler(searchParams: URLSearchParams) {
  await dbConnect();

  const category_ = searchParams.get("category");
  const page_ = parseInt(searchParams.get("page") || "1", 10);
  const limit_ = parseInt(searchParams.get("limit") || "8", 10);
  const query_ = searchParams.get("query");
  const date_ = searchParams.get("date");
  const top_articles_ = searchParams.get("top_articles");
  const excluding = searchParams.get("excluding");

  let matchConditions: any = { trashed: false };

  if (category_) {
    matchConditions.category = category_;
  }

  if (query_) {
    matchConditions.$or = [
      { title: { $regex: query_, $options: "i" } },
      { content: { $regex: query_, $options: "i" } },
      { postTags: { $regex: query_, $options: "i" } },
      { author: { $regex: query_, $options: "i" } },
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

  if (excluding) {
    const excludeIds = excluding.split(',').map(id => id.trim());
    const validObjectIds = excludeIds.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));
    if (validObjectIds.length > 0) {
      matchConditions._id = { $nin: validObjectIds };
    }
  }

  const totalArticles = await ArticleModel.countDocuments(matchConditions);
  const totalPages = Math.ceil(totalArticles / limit_);
  const skip = (page_ - 1) * limit_;

  let sortStage: { [key: string]: 1 | -1 } = { createdAt: -1 };
  if (top_articles_ === "true") {
    sortStage = { voteCount: -1 };
  }

  const articles = await ArticleModel.aggregate([
    { $match: matchConditions },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: limit_ },
    {
      $lookup: {
        from: "users",
        let: { publisherId: { $toObjectId: "$publisherID" } },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$publisherId"] } } }
        ],
        as: "publisher"
      }
    },
    {
      $addFields: {
        publisher: { $arrayElemAt: ["$publisher", 0] }
      }
    }
  ]);

  if (articles.length === 0) {
    const message =
      totalArticles === 0
        ? "No articles found for this category."
        : "No articles found for this page.";
    return {
      success: true,
      message,
      articles: [],
      totalPages,
      currentPage: page_,
      totalArticles,
      status: 200
    };
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
        const position = await PositionModel.findById(article.publisher.positionID);
        position_name = position?.name || "";
      }

      const link = article_link + article._id;

      return {
        _id: article._id.toString(),
        wp_id: article.wp_id,
        title: article.title,
        oneLiner: article.oneLiner,
        publishedIn: article.publishedIn,
        featuredImage: article.featuredImage,
        publisherID: article.publisherID?.toString?.() || "",
        voteCount: article.voteCount,
        postTags: article.postTags,
        updatedAt: article.updatedAt?.toISOString?.() || "",
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

  return {
    success: true,
    articles: transformed_articles,
    totalPages,
    currentPage: page_,
    totalArticles,
    status: 200,
  };
}

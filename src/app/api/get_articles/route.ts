import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect";
import ArticleModel from "@/models/Article";
import extractFirst15Words from "@/helpers/extractFiffteenWords";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const articles = await ArticleModel.aggregate([
      { $match: { trashed: false } }, // Filter out trashed articles
      { $sort: { createdAt: -1 } }, // Sort by latest createdAt
      {
        $group: {
          _id: "$category", // Group by category field
          articles: { $push: "$$ROOT" }, // Collect all articles in an array
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          category: "$_id", // Rename _id to category
          articles: {
            $slice: ["$articles", 4], // Take only the first 4 articles
          },
        },
      },
      {
        $project: {
          category: 1, // Keep category
          articles: {
            $map: {
              input: "$articles",
              as: "article",
              in: {
                title: "$$article.title",
                content: "$$article.content",
                createdAt: "$$article.createdAt",
                author: "$$article.author",
                // Add other fields here if needed
              },
            },
          },
        },
      },
    ]);

    // Process articles to extract first 15 words from content
    const processedArticles = articles.map((category) => ({
      category: category.category,
      articles: category.articles.map((article: any) => ({
        title: article.title,
        content: article.content ? extractFirst15Words(article.content) : "No content available",
        createdAt: article.createdAt,
        author: article.author,
      }))
    }));

    // Check if articles are empty
    if (!articles.length) {
      console.log("No articles found matching the criteria.");
      return NextResponse.json(
        { success: false, message: "No articles found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, articles: processedArticles },
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
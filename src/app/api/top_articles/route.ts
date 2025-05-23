import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect"; // Fixed typo: dbConnnect -> dbConnect
import ArticleModel from "@/models/Article";
import extractFirst15Words from "@/helpers/extractFiffteenWords";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const articles = await ArticleModel.aggregate([
      { $match: { trashed: false } }, // Filter out trashed articles
      { $sort: { createdAt: -1 } }, // Sort by latest createdAt
      { $limit: 6 }, // Limit to 6 articles
      {
        $project: {
          _id: 0, // Exclude _id field
          title: 1,
          subtitle: "$content",
          author: 1,
          image: "$featuredImage",
          link: "$_id",
          category: 1 // Include category if needed
        }
      }
    ]);

    // Process articles to extract first 15 words from subtitle
    const processedArticles = articles.map((article: any) => ({
      title: article.title || "Untitled", // Fallback for missing title
      subtitle: article.subtitle
        ? extractFirst15Words(article.subtitle) + "..."
        : "No content available",
      image: article.image || null, // Fallback for missing image
      author: article.author || "Unknown Author", // Fallback for missing author
      link: `/p/${article.link}`,
      category: article.category || "Uncategorized" // Fallback for missing category
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
      { status: 500 } // Changed to 500 for server-side errors
    );
  }
}
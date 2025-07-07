import { getArticlesHandler } from "@/lib/handlers/getArticles";
import Article from "@/types/post_objects/article";

export async function fetchTopArticles(): Promise<Article[]> {
  try {
    const params = new URLSearchParams({ top_articles: "true" });
    const response = await getArticlesHandler(params);

    if (response.success && Array.isArray(response.articles)) {
      return response.articles as Article[];
    }

    console.log("Handler for top_articles returned success: false");
    return [];
  } catch (error: any) {
    console.error("Error fetching top articles:", error.message);
    return [];
  }
}

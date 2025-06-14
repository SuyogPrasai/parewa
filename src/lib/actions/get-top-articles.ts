import axios from "axios";

import Article from "@/types/post_objects/article";
import { ArticlesResponse } from "@/types/api-responses";

export async function fetchTopArticles(): Promise<Article[]> {
    try {
        const response = await axios.get<ArticlesResponse>(`${process.env.SITE_BASE_URI}/api/get_articles?top_articles=true`);

        if (response.data.success) {
            return response.data.articles;

        }
        console.log("API /api/get_articles?top_articles=true returned success: false")
        return [];

    } catch (error: any) {
        console.error("Error fetching notices:", error);
        return [];

    }
}
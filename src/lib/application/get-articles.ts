import { getArticlesHandler } from "@/lib/handlers/getArticles";
import Article from "@/types/post_objects/article";

// Define the type for query parameters
interface ArticleQueryParams {
	category?: string;
	page?: number;
	query?: string;
	date?: string | Date;
	limit?: number;
	[key: string]: string | number | Date | undefined;
}

export async function fetchArticles(params: ArticleQueryParams = {}): Promise<{
	articles: Article[];
	totalPages: number;
	error: string | null;
}> {
	try {
		const defaultParams = {
			limit: 8,
			...params,
		};

		// Convert date to string if necessary
		const processedParams: Record<string, string | number> = {};
		for (const [key, value] of Object.entries(defaultParams)) {
			if (value !== undefined && value !== null) {
				processedParams[key] =
					value instanceof Date ? value.toISOString().split("T")[0] : value;
			}
		}

		const searchParams = new URLSearchParams(
			Object.entries(processedParams).reduce<Record<string, string>>((acc, [key, value]) => {
				acc[key] = String(value);
				return acc;
			}, {})
		);
		const response = await getArticlesHandler(searchParams);

		if (response.success && Array.isArray(response.articles)) {
			return {
				articles: response.articles,
				totalPages: response.totalPages ?? 1,
				error: null,
			};
		}

		console.log(`getArticlesHandler returned success: false with params`, processedParams);
		return {
			articles: [],
			totalPages: 1,
			error: "Handler returned unsuccessful response",
		};
	} catch (error: any) {
		console.error("Error fetching articles:", error.message);
		return {
			articles: [],
			totalPages: 1,
			error: error.message || "Failed to fetch articles",
		};
	}
}

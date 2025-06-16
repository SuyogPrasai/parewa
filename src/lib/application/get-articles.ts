import axios from 'axios';
import { ArticlesResponse } from '@/types/api-responses';
import Article from '@/types/post_objects/article';

// Define the type for query parameters
interface ArticleQueryParams {
	category?: string;
	page?: number;
	query?: string;
	date?: string | Date;
	limit?: number;
	[key: string]: string | number | Date | undefined; // Allow additional params
}

export async function fetchArticles(params: ArticleQueryParams = {}): Promise<{
	articles: Article[];
	totalPages: number;
	error: string | null;
}> {
	try {
		// Default parameters
		const defaultParams = {
			limit: 8,
			...params,
		};

		// Convert params to query string, handling Date objects and filtering undefined values
		const queryString = Object.entries(defaultParams)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => {
				const encodedValue =
					value instanceof Date ? value.toISOString().split('T')[0] : String(value);
				return `${encodeURIComponent(key)}=${encodeURIComponent(encodedValue)}`;
			})
			.join('&');

		const url = `${process.env.SITE_BASE_URI}/api/get_articles${queryString ? `?${queryString}` : ''}`;

		const response = await axios.get<ArticlesResponse>(url);

		if (response.data.success) {
			return {
				articles: response.data.articles,
				totalPages: response.data.totalPages || 1, // Fallback to 1 if not provided
				error: null,
			};
		}

		console.log(`API ${url} returned success: false`);
		return {
			articles: [],
			totalPages: 1,
			error: 'API request failed',
		};
	} catch (error: any) {
		console.error('Error fetching articles:', error.message);
		return {
			articles: [],
			totalPages: 1,
			error: error.message || 'Failed to fetch articles',
		};
	}
}
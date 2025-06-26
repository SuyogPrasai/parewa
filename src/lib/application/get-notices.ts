import axios from 'axios';
import Notice from '@/types/post_objects/notice';
import { NoticesResponse } from '@/types/api-responses';

// Define the type for query parameters
interface NoticeQueryParams {
  category?: string;
  page?: number;
  query?: string;
  date?: string | Date;
  limit?: number;
  [key: string]: string | number | Date | undefined; // Allow additional params
}

export async function fetchNotices(params: NoticeQueryParams = {}): Promise<{
  notices: Notice[];
  totalPages: number;
  error: string | null;
}> {
  try {
    // Default parameters
    const defaultParams = {
      limit: 8,
      ...params,
    };

    // Remove category if it's "general"
    if (defaultParams.category?.toLowerCase() === 'general') {
      delete defaultParams.category;
    }

    // Convert params to query string, handling Date objects and filtering undefined values
    const queryString = Object.entries(defaultParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        const encodedValue =
          value instanceof Date ? value.toISOString().split('T')[0] : String(value);
        return `${encodeURIComponent(key)}=${encodeURIComponent(encodedValue)}`;
      })
      .join('&');

    const url = `${process.env.PAREWA_BASE_URI}/api/get_news${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get<NoticesResponse>(url);

    if (response.data.success) {
      return {
        notices: response.data.notices,
        totalPages: response.data.totalPages || 1, // Fallback to 1 if not provided
        error: null,
      };
    }

    console.log(`API ${url} returned success: false`);
    return {
      notices: [],
      totalPages: 1,
      error: 'API request failed',
    };
  } catch (error: any) {
    console.error('Error fetching notices:', error.message);
    return {
      notices: [],
      totalPages: 1,
      error: error.message || 'Failed to fetch notices',
    };
  }
}
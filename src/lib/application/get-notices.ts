import { getNoticesHandler } from "@/lib/handlers/getNotices";
import Notice from "@/types/post_objects/notice";

// Define the type for query parameters
interface NoticeQueryParams {
  category?: string;
  page?: number;
  query?: string;
  date?: string | Date;
  limit?: number;
  [key: string]: string | number | Date | undefined;
}

export async function fetchNotices(params: NoticeQueryParams = {}): Promise<{
  notices: Notice[];
  totalPages: number;
  error: string | null;
}> {
  try {
    const defaultParams = {
      limit: 8,
      ...params,
    };

    // Remove "general" category
    if (defaultParams.category?.toLowerCase() === "general") {
      delete defaultParams.category;
    }

    // Convert Date objects to string, filter undefined/null
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
    const response = await getNoticesHandler(searchParams);

    if (response.success && Array.isArray(response.notices)) {
      return {
        notices: response.notices,
        totalPages: response.totalPages ?? 1,
        error: null,
      };
    }

    console.log("getNoticesHandler returned success: false", processedParams);
    return {
      notices: [],
      totalPages: 1,
      error: "Handler returned unsuccessful response",
    };
  } catch (error: any) {
    console.error("Error fetching notices:", error.message);
    return {
      notices: [],
      totalPages: 1,
      error: error.message || "Failed to fetch notices",
    };
  }
}

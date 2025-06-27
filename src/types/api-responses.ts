import Article from "@/types/post_objects/article";
import Notice from "@/types/post_objects/notice";

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface NoticeResponse {
    success: boolean;
    notice: Notice;
}

export interface ArticleResponse {
    success: boolean;
    article: Article;
}

export interface ArticlesResponse extends ApiResponse {
  articles: Article[];
  totalPages?: number;
}

export interface NoticesResponse extends ApiResponse {
  notices: Notice[];
  totalPages?: number;
}

export interface NotificationResult {
    success: boolean;
    message?: string;
    successCount?: number;
    failureCount?: number;
    error?: any;
}
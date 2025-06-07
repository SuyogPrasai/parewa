import Article from "@/types/post_objects/article";
import Notice from "@/types/post_objects/notice";

export interface ApiResponse {
    success: boolean;
    message: string;
}

export default interface NoticeResponse {
    success: boolean;
    notice: Notice;
}

export default interface ArticleResponse {
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
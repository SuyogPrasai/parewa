import Article from "@/types/post_objects/article";

export default interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ArticlesSectionProps {
    category: string;
    articles: Article[];
}
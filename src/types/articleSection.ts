export type Article = {
    date: Date;
    title: string;
    subtitle: string;
    link: string;
    image: string;
    author: string;
    category?: string[];
};

export interface ArticlesSectionProps {
    category: string;
    articles: Article[];
}

export interface ArticlesResponse {
  success: boolean;
  articles: Article[];
  totalPages: number;
}

export type Article = {
    link: string;
    image: string;
    title: string;
    subtitle?: string;
    author: string;
};

export interface ArticlesSectionProps {
    category: string;
    articles: Article[];
}
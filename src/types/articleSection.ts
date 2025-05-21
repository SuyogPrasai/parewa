export type Article = {
    title: string;
    subtitle: string;
    link: string;
    image: string;
    author: string;
};

export interface ArticlesSectionProps {
    category: string;
    articles: Article[];
}
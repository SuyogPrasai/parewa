export interface Article {
    _id: string;
    title: string;
    content: string;
    publishedIn: string; // ISO 8601 date string
    featuredImage: string; // URL
    voteCount: number;
    postTags: string[];
    author: string;
    publisher: {
        _id: string;
        name: string;
        username: string;
    };

}

export default interface ArticleResponse {
    success: boolean;
    article: Article;
}
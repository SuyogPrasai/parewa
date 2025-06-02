export interface Article {
    _id: string;
    title: string;
    content: Element[];
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

interface Element {
  type: string;
  content?: string;
  attrs?: Record<string, any>;
}


export default interface ArticleResponse {
    success: boolean;
    article: Article;
}
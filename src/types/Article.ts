import { Document } from "mongoose";

export default interface Article extends Document {
  id: string;
  title: string;
  oneLiner?: string;
  content?: string;
  publishedIn: Date;
  featuredImage?: string; // Path to the featured image
  publisherID: string; // Reference to User ID
  voteCount: number;
  postTags: string[];
  modifiedIn: Date;
  trashed: boolean;
  category: string;
  author: string;
  link: string;
}

export interface ArticlesResponse {
  success: boolean;
  articles: Article[];
  totalPages: number;
}

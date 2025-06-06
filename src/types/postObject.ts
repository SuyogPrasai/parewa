import { Document } from "mongoose";

// TODO: to remove this need to check
interface Element {
  type: string;
  content?: string;
  attrs?: Record<string, any>;
}

export default interface PostObject extends Document{
    id: string;
    title: string;
    oneLiner?: string;
    content?: string;
    publishedIn: Date;
    featuredImage?: string; // Path to the featured image
    publisher: {
        _id: string;
        name: string;
        username: string;
    };
    voteCount: number;
    postTags: string[];
    modifiedIn: Date;
    trashed?: boolean;
    category: string;
    link: string;
}
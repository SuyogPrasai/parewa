import { Document } from "mongoose";

export default interface PostObject {
    wp_id: string;
    title: string;
    oneLiner?: string;
    content?: string;
    publishedIn: Date;
    featuredImage?: string; // Path to the featured image
    publisherID?: string;
    voteCount?: number;
    postTags: string[];
    updatedAt?: Date;
    trashed?: boolean;
    category: string;
    link?: string;
}

export interface PostObjectDB extends Document, PostObject {}

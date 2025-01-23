import { User } from "./User"

export interface Notice {
    id: String;
    title: String;
    content: String;
    publishedIn: Date;
    documents: String[]; // Path to the document
    featuredImage: String; // Path to the image
    postedBy: User;   
}
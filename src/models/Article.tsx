import { User } from "./User"

export interface Article {
    id: String;
    title: String;
    content: String;
    publishedIn: Date;
    documents: String[]; // Path to the document
    featuredImage: String; // Path to the image
    author: User;
    editor: User; 
    approvedBy: User;   
}
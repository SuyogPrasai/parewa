import mongoose, { Schema, model, Document } from "mongoose";
import { User } from "./User";

// Defining the interface for the Article model
export interface Article extends Document {
  title: string;
  content: string;
  publishedIn: Date;
  documents: string[]; // Paths to documents
  featuredImage: string; // Path to the featured image
  authorID: string; // Reference to User ID
  editorID: string; // Reference to User ID
  approvedByID: string; // Reference to User ID
}

// Defining the Article schema
const ArticleSchema: Schema<Article> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    publishedIn: { type: Date, required: true },
    documents: [{ type: String }], // Array of document paths
    featuredImage: { type: String, required: true }, // Path to the featured image
    authorID: { type: String, ref: "User", required: true }, // User ID reference
    editorID: { type: String, ref: "User" }, // User ID reference
    approvedByID: { type: String, ref: "User" }, // User ID reference
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
export const ArticleModel = model<Article>("Article", ArticleSchema);

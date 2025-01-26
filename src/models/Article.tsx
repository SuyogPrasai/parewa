import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the Article model
export interface Article extends Document {
  id: string;
  title: string;
  content: string;
  publishedIn: Date;
  documents: string[]; // Paths to documents
  featuredImage: string; // Path to the featured image
  authorID: string; // Reference to User ID
  editorID: string; // Reference to User ID
  approvedByID: string; // Reference to User ID
  voteCount: Number;
}

// Defining the Article schema
const ArticleSchema: Schema<Article> = new Schema(
  {
    id: { type: String, required: true, trim: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    publishedIn: { type: Date, required: true },
    documents: [{ type: String }], // Array of document paths
    featuredImage: { type: String, required: true }, // Path to the featured image
    authorID: { type: String, ref: "User", required: true }, // User ID reference
    editorID: { type: String, ref: "User" }, // User ID reference
    approvedByID: { type: String, ref: "User" }, // User ID reference
    voteCount: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const ArticleModel = (mongoose.models.Article as mongoose.Model<Article>) || (mongoose.model<Article>('Article', ArticleSchema));

export default ArticleModel;

import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the Article model
export interface Article extends Document {
  id: string;
  title: string;
  content?: string;
  publishedIn: Date;
  featuredImage?: string; // Path to the featured image
  authorID: string; // Reference to User ID
  voteCount?: Number;
  postTags: string[];
  modifiedIn?: Date;
  trashed?: boolean;
}

// Defining the Article schema
const ArticleSchema: Schema<Article> = new Schema(
  {
    id: { type: String, required: true, trim: true, unique: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    content: { type: String, required: false },
    publishedIn: { type: Date, required: true },
    featuredImage: { type: String, required: false }, // Path to the featured image
    authorID: { type: String, ref: "User", required: true }, // User ID reference
    voteCount: { type: Number, default: 0 },
    postTags: [{ type: String}],
    modifiedIn: { type: Date },
    trashed: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const ArticleModel = (mongoose.models.Article as mongoose.Model<Article>) || (mongoose.model<Article>('Article', ArticleSchema));

export default ArticleModel;

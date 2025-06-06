import mongoose, { Schema, Document } from "mongoose";

import Article from "@/types/post_objects/article";

// Defining the Article schema
const ArticleSchema: Schema<Article> = new Schema(
  {
    id: { type: String, required: true, trim: true, unique: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    oneLiner: { type: String, required: false, trim: true},
    content: { type: String, required: false },
    publishedIn: { type: Date, required: true },
    featuredImage: { type: String, required: false }, // Path to the featured image
    publisherID: { type: String, ref: "User", required: true }, // User ID reference
    voteCount: { type: Number, default: 0 },
    postTags: [{ type: String}],
    modifiedIn: { type: Date },
    trashed: { type: Boolean, default: false },
    category: { type: String, required: true },
    author: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const ArticleModel = (mongoose.models.Article as mongoose.Model<Article>) || (mongoose.model<Article>('Article', ArticleSchema));

export default ArticleModel;

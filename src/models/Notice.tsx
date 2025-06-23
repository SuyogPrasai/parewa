import mongoose, { Schema } from "mongoose";

import { NoticeDB } from "@/types/post_objects/notice";

// Defining the Notice schema
const NoticeSchema: Schema<NoticeDB> = new Schema(
  {
    wp_id: { type: String, required: true, trim: true, unique: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    content: { type: String, required: false },
    publishedIn: { type: Date, required: true },
    published_for: { type: String, required: true },
    featuredImage: { type: String, required: false }, // Path to the featured image
    publisherID: { type: String, ref: "User", required: true }, // User ID reference
    voteCount: { type: Number, default: 0 },
    postTags: [{ type: String }],
    trashed: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const NoticeModel = (mongoose.models.Notice as mongoose.Model<NoticeDB>) || (mongoose.model<NoticeDB>('Notice', NoticeSchema));

export default NoticeModel;
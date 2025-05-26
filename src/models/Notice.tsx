import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the Notice model
export interface Notice extends Document {
  id: string;
  title: string;
  content?: string;
  publishedIn: Date;
  featuredImage?: string; // Path to the featured image
  publisherID: string; // Reference to User ID
  voteCount: number;
  postTags: string[];
  modifiedIn?: Date;
  trashed?: boolean;
  category: string;
}

// Defining the Notice schema
const NoticeSchema: Schema<Notice> = new Schema(
  {
    id: { type: String, required: true, trim: true, unique: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    content: { type: String, required: false },
    publishedIn: { type: Date, required: true },
    featuredImage: { type: String, required: false }, // Path to the featured image
    publisherID: { type: String, ref: "User", required: true }, // User ID reference
    voteCount: { type: Number, default: 0 },
    postTags: [{ type: String }],
    modifiedIn: { type: Date },
    trashed: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

NoticeSchema.index(
  {
    title: "text",
    content: "text",
    postTags: "text"
  },
  {
    name: "notice_search_index", // Optional: Give your index a descriptive name
    weights: {
      title: 10,  // Give more weight to matches in the title
      content: 5, // Give less weight to matches in the content
      postTags: 8 // Give moderate weight to matches in tags
    },
    default_language: "english" // Specify the language for text processing
  }
);

// Exporting the model
const NoticeModel = (mongoose.models.Notice as mongoose.Model<Notice>) || (mongoose.model<Notice>('Notice', NoticeSchema));

export default NoticeModel;
import mongoose, { Schema, model, Document } from "mongoose";
import { User } from "./User";

// Defining the interface for the Notice model
export interface Notice extends Document {
  id: string;
  title: string;
  content: string;
  publishedIn: Date;
  documents?: string[]; // Paths to associated documents
  featuredImage: string; // Path to the featured image
  postedBy: string; // Reference to the User ID
  voteCount: Number;
  postTags: string[]; 
  modifiedIn?: Date; 

}

// Defining the Notice schema
const NoticeSchema: Schema<Notice> = new Schema(
  {
    id: { type: String, required: true, trim: true }, // Reference to the wordpressd database for this
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    publishedIn: { type: Date, required: true },
    documents: [{ type: String , required: false}], // Array of document paths
    featuredImage: { type: String, required: true }, // Path to the featured image
    postedBy: { type: String, ref: "User", required: true }, // User ID reference
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
const NoticeModel = (mongoose.models.Notice as mongoose.Model<Notice>) || (mongoose.model<Notice>('Noitce', NoticeSchema));

export default NoticeModel;
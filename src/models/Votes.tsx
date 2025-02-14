import mongoose, { Schema, model, Document } from "mongoose";

/**
 * Represents the possible values for a vote: 1 for upvote, -1 for downvote.
 */
export type VoteValue = 1 | -1;

export interface Vote extends Document {
  userID: string;
  articleID?: string;
  noticeID?: string;
  postType: string;
  upVotes: string[]; // Fixed casing to match schema
  downVotes: string[];
}

/**
 * Schema definition for the Vote model.
 */
const VoteSchema: Schema<Vote> = new Schema(
  {
    userID: { type: String, required: true },
    articleID: { type: String },
    noticeID: { type: String },
    postType: { type: String, required: true },
    upVotes: { type: [String], default: [] }, // Fixed casing and added default
    downVotes: { type: [String], default: [] }, // Added default
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Mongoose model for the Vote schema.
 */
const VoteModel = mongoose.models.Vote || model<Vote>("Vote", VoteSchema);

export default VoteModel;

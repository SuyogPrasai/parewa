import mongoose, { Schema, model, Document } from "mongoose";

/**
 * Represents the possible values for a vote: 1 for upvote, -1 for downvote.
 */
export type VoteValue = 1 | -1;


export interface Vote extends Document {
  userID: string;
  articleID?: string;
  noticeID?: string;
  vote: VoteValue;
}

/**
 * Schema definition for the Vote model.
 */
const VoteSchema: Schema<Vote> = new Schema(
  {
    userID: { type: String, required: true },
    articleID: { type: String, required: false },
    noticeID: { type: String, required: false },
    vote: { 
      type: Number, 
      required: true, 
      enum: [1, -1], // Restrict to valid vote values
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Mongoose model for the Vote schema.
 * Ensures only one instance of the model is created and reused if it already exists.
 */
const VoteModel = mongoose.models.Vote || model<Vote>("Vote", VoteSchema);

export default VoteModel;

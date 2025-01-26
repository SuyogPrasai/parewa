import mongoose, { Schema, model, Document } from "mongoose";

/**
 * Represents the possible values for a vote: 1 for upvote, -1 for downvote.
 */
export type VoteValue = 1 | -1;

/**
 * Represents a vote document in the database.
 * @property userID - The ID of the user who cast the vote.
 * @property articleID - The optional ID of the associated article.
 * @property noticeID - The optional ID of the associated notice.
 * @property vote - The value of the vote (1 for upvote, -1 for downvote).
 */
export interface IVote extends Document {
  userID: string;
  articleID?: string;
  noticeID?: string;
  vote: VoteValue;
}

/**
 * Schema definition for the Vote model.
 */
const VoteSchema: Schema<IVote> = new Schema(
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
const VoteModel = mongoose.models.Vote || model<IVote>("Vote", VoteSchema);

export default VoteModel;

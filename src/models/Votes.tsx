import mongoose, { Schema, model, Document } from "mongoose";

export interface _Vote {
    string: -1 | 1;
}

export interface Votes extends Document {
    userID: string;
    articleID: string;
    vote: _Vote; // 1 for upvote, -1 for downvote
}

const Voteschema: Schema<Votes> = new Schema(
    {
        userID: { type: String, required: true },
        articleID: { type: String, required: true },
        vote: { type: Number, required: true },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const votesModel = ( mongoose.models.Votes as mongoose.Model<Votes> ) || (mongoose.model<Votes>('Votes', Voteschema));

export default votesModel;
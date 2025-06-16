import mongoose, { Schema, Document } from "mongoose";

export interface Vote {
    post_type: string;
    post_id: string;
    user_id: string;
    vote: number;
    updatedAt: Date
    createdAt: Date;
}

export interface VoteDB extends Document, Vote {}

export interface VoteProps extends Vote {
        _id: string;
}

const VoteSchema: Schema = new Schema(
    {
        post_type: { type: String, required: true },
        post_id: { type: String, required: true },
        user_id: { type: String, required: true },
        vote: { type: Number, required: true },
    },
    {
        timestamps: true
    }
);


const VoteModel = (mongoose.models.Vote as mongoose.Model<VoteDB>) || (mongoose.model<VoteDB>('Vote', VoteSchema));

export default VoteModel;
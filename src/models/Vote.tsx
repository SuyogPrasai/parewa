import mongoose, { Schema, Document } from "mongoose";

export interface Vote extends Document {
    _id: string;
    post_type: string;
    post_id: string;
    user_id: string;
    vote: number;
    updatedAt: Date
    createdAt: Date;
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


const VoteModel = (mongoose.models.Vote as mongoose.Model<Vote>) || (mongoose.model<Vote>('Vote', VoteSchema));

export default VoteModel;
import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the Notice model
export interface FcmToken extends Document {
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

// Defining the Notice schema
const FcmTokenSchema: Schema<FcmToken> = new Schema(
    {
        token: { type: String, required: true, trim: true },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Exporting the model
const FcmTokenModel = (mongoose.models.FcmToken as mongoose.Model<FcmToken>) || (mongoose.model<FcmToken>('FcmToken', FcmTokenSchema));

export default FcmTokenModel;
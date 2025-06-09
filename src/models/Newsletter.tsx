import mongoose, { Schema, Document } from "mongoose";

export interface Newsletter extends Document {
    email: string;
    announcements: boolean;
    notices: boolean;
    articles: boolean;
    createdAt: boolean;
    updatedAt: boolean;
    userID?: string;
}

const NewsletterSchema: Schema = new Schema({
    email: { type: String, required: true },
    announcements: { type: Boolean, default: true },
    notices: { type: Boolean, default: true },
    articles: { type: Boolean, default: true },
    userID: { type: String, required: false, ref: 'User'},
},
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);


const NewsletterModel = (mongoose.models.Newsletter as mongoose.Model<Newsletter>) || (mongoose.model<Newsletter>('Newsletter', NewsletterSchema));

export default NewsletterModel;
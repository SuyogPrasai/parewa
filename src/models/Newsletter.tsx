import mongoose, { Schema, model, Document } from "mongoose";

export interface Newsletter extends Document {
    email: string;
}

const NewsletterSchema: Schema = new Schema({
    email: { type: String, required: true },
},
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);


const NewsletterModel = (mongoose.models.Newsletter as mongoose.Model<Newsletter>) || (mongoose.model<Newsletter>('Newsletter', NewsletterSchema));

export default NewsletterModel;
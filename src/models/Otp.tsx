import mongoose, { Schema, Document } from "mongoose";

export interface Otp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

const OtpSchema: Schema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000), required: true } // 15 minutes from createdAt
});


const OtpModel = (mongoose.models.Otp as mongoose.Model<Otp>) || (mongoose.model<Otp>('Otp', OtpSchema));

export default OtpModel;
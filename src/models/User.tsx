import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the User model
export interface User extends Document {
  username: string;
  name: string;
  email: string;
  tagsIDS: string[]; // Array of tag IDs
  password: string; // Hashed password
  roleID: string; // Role ID reference
  positionID: string; // Position ID reference
  rollNumber?: number; // Optional
  articleIDS: string[]; // Array of article IDs
  verifyCode: string; // Verification code
  verifyCodeExpiry: Date; // Expiry of the verification code
  createdAt: Date; // Automatically added by timestamps
}

// Defining the User schema
const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    tagsIDS: [{ type: String, ref: "Tag" }], // Array of tag IDs, references the Tag model
    password: { type: String, required: true }, // Hashed password
    roleID: { type: String, ref: "Role", required: true }, // Role ID, references the Role model
    positionID: { type: String, ref: "Position", required: true }, // Position ID, references the Position model
    rollNumber: { type: Number }, // Optional
    articleIDS: [{ type: String, ref: "Article" }], // Array of article IDs, references the Article model
    verifyCode: { type: String, required: true },
    verifyCodeExpiry: { type: Date, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
export const UserModel = model<User>("User", UserSchema);

import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the User model
export interface User extends Document {
  username: string;
  name: string;
  email: string;
  UsertagIDS: string[]; // Array of tag IDs
  password: string; // Hashed password
  roleID: string; // Role ID reference
  positionID?: string; // Position ID reference
  rollNumber?: number; // Optional
  articleIDS: string[]; // Array of article IDs
  isVerified: Boolean;
  createdAt: Date; // Automatically added by timestamps
}

// Defining the User schema
const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    UsertagIDS: [{ type: String, ref: "Tag" }], // Array of tag IDs, references the Tag model
    password: { type: String, required: true }, // Hashed password
    roleID: { type: String, ref: "Role", required: true }, // Role ID, references the Role model
    positionID: { type: String, ref: "Position", required: false }, // Position ID, references the Position model
    isVerified: { type: Boolean, default: false },
    rollNumber: { type: Number }, // Optional
    articleIDS: [{ type: String, ref: "Article" }], // Array of article IDs, references the Article model    verifyCodeExpiry: { type: Date, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;

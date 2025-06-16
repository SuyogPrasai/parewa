import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the User model
export interface User extends Document {
  wp_id?: string;
  username: string;
  name: string;
  email: string;
  userTagIDS?: string[]; // Array of tag IDs
  password: string; // Hashed password
  roleID: string; // Role ID reference
  positionID?: string; // Position ID reference
  rollNumber?: number; // Optional
  articleIDS?: string[]; // Array of article IDs
  noticeIDS?: string[]; // Array of notice IDs
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Defining the User schema
const UserSchema: Schema<User> = new Schema(
  {
    wp_id: { type: String, required: false, unique: false },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true  },
    name: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true  },
    userTagIDS: [{ type: String, ref: "Tag" }], // Array of tag IDs, references the Tag model
    password: { type: String, required: false }, // Hashed password
    roleID: { type: String, ref: "Role", required: true }, // Role ID, references the Role model
    positionID: { type: String, ref: "Position", required: false }, // Position ID, references the Position model
    isVerified: { type: Boolean, default: false },
    rollNumber: { type: Number }, // Optional
    articleIDS: [{ type: String, ref: "Article" }], // Array of article IDs, references the Article model    verifyCodeExpiry: { type: Date, required: true },
    noticeIDS: [{ type: String, ref: "Notice" }], // Array of notice IDs, references the Notice model
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;

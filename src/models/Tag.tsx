import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the Tag model
export interface UserTag {
    name: String;
    color: String;
}

// Defining the UserTag schema
const UserTagSchema: Schema<UserTag> = new Schema(
    {
      name: { type: String, required: true, trim: true },
      color: { type: String, required: true },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );
  
  // Exporting the model
const UserTagModel = (mongoose.models.UserTag as mongoose.Model<UserTag>) || (mongoose.model<UserTag>('UserTag', UserTagSchema));

export default UserTagModel;
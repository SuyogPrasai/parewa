import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the Tag model
export interface Tag {
    name: String;
    color: String;
}

// Defining the Tag schema
const TagSchema: Schema<Tag> = new Schema(
    {
      name: { type: String, required: true, trim: true },
      color: { type: String, required: true },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );
  
  // Exporting the model
const TagModel = (mongoose.models.Tag as mongoose.Model<Tag>) || (mongoose.model<Tag>('Tag', TagSchema));

export default TagModel;
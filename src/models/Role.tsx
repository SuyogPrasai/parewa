import mongoose, { Schema, model, Document } from "mongoose";

// Defining the interface for the Role model
export interface Role extends Document {
  name: string;
}

// Defining the Role schema
const RoleSchema: Schema<Role> = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
export const RoleModel = model<Role>("Role", RoleSchema);

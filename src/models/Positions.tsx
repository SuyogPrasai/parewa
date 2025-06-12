import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the Position model
export interface Position extends Document {
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Defining the Position schema
const PositionSchema: Schema<Position> = new Schema(
  {
    
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const PositionModel = (mongoose.models.Position as mongoose.Model<Position>) || (mongoose.model<Position>('Position', PositionSchema));

export default PositionModel;

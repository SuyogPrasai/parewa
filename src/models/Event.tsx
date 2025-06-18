import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the Notice model
export interface Event extends Document {
    title: string;
    startDate: string;
    endDate: string;
    createdAt: Date;
    updatedAt: Date;
}

// Defining the Notice schema
const EventSchema: Schema<Event> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Exporting the model
const EventModel = (mongoose.models.Event as mongoose.Model<Event>) || (mongoose.model<Event>('Event', EventSchema));

export default EventModel;
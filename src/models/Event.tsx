import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the Notice model
export interface Event extends Document {
    title: string;
    start_date: Date;
    end_date: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Defining the Notice schema
const EventSchema: Schema<Event> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Exporting the model
const EventModel = (mongoose.models.Event as mongoose.Model<Event>) || (mongoose.model<Event>('Event', EventSchema));

export default EventModel;
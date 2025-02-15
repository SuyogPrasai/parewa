import { Schema, model, models } from 'mongoose';

// Event schema definition
const eventSchema = new Schema({
    Title: { type: String, required: true },
    start_date: { type: String, required: true },  // Adjust to your date format
    end_date: { type: String, required: true },    // Adjust to your date format
});

const EventModel = models.Event || model('Event', eventSchema);
export default EventModel;

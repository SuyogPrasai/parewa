import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        // Remove useNewUrlParser and useUnifiedTopology as they are default in Mongoose 6.x
        await mongoose.connect('mongodb://127.0.0.1:27017/calendar_data');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};

export default dbConnect;

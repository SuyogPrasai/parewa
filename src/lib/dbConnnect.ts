import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,
}

const connection: ConnectionObject = {}

export const dbConnect = async (): Promise<void>  => {
    if(connection.isConnected){
        console.log("DB Already Connected!")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODBURI || '', {});
        connection.isConnected = db.connections[0].readyState;   
        
        console.log("DB Connected Successfully");
    }
    catch(error) {
        process.exit(1);
        console.log("DB Connection Failed", error)
    }
    
}

export default dbConnect;
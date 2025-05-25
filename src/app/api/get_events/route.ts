import dbConnect from "@/lib/dbConnnect";

import { NextResponse, NextRequest } from "next/server";
import EventModel from "@/models/Event";
import UserModel, { User } from "@/models/User"; // Assuming you have a User model

import { Types } from "mongoose"; // Import Mongoose types

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    let date = searchParams.get("date");

    if (!date) {
        console.log("Date is required.");
        return NextResponse.json({ success: false, message: "Date is required" }, { status: 400 });
    }

    const events = await EventModel.find({ start_date: date });

    try {
    
        return NextResponse.json(
            { success: true, events: events},
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching notices from the database:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching notices from the server" },
            { status: 400 }
        );
    }
}
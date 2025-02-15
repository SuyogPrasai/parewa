import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnnect"; // Adjust path as needed
import EventModel from "@/models/Event";  // Adjust path as needed

// Handler for fetching events
export async function GET(request: NextRequest) {
  await dbConnect();

  try {

    // Extract the query parameters using .get() method
    const { searchParams } = request.nextUrl;
    const date = searchParams.get('date');
    console.log(searchParams); 
    console.log(date);

    if (!date) {
      return NextResponse.json(
        { success: false, message: "Date query parameter is required" },
        { status: 400 }
      );
    }

    // Format date to ensure it's in the correct 'YYYYMMDD' format (removing any hyphens)

    // Query events for the provided date and sort by the start date
    const events = await EventModel.find({ start_date: date })
      .sort({ start_date: 1 });

    if (events.length === 0) {
      return NextResponse.json(
        { success: true, message: "No events found for this date" },
        { status: 200 }
      );
    }

    // Return the events with CORS headers
    const response = NextResponse.json(
      { success: true, events },
      { status: 200 }
    );

    // Add CORS headers to allow dynamic origin
    const origin = request.headers.get('origin');
    response.headers.set('Access-Control-Allow-Origin', origin ?? '*'); // Allows dynamic origin
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching events" },
      { status: 500 }
    );
  }
}

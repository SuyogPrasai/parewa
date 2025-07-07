import { NextRequest, NextResponse } from "next/server";
import { getActiveAnnouncementHandler } from "@/lib/handlers/getAnnouncement";

export async function GET(request: NextRequest) {
  try {
    const result = await getActiveAnnouncementHandler();
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error fetching announcement:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting announcement",
      },
      { status: 400 }
    );
  }
}

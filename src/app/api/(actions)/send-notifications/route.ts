import { NextRequest, NextResponse } from "next/server";
import { sendFCMNotifications } from "@/lib/handlers/sendFCMNotifications";

export async function POST(request: NextRequest) {
  try {
    const { title, body, url, data } = await request.json();
    const result = await sendFCMNotifications({ title, body, url, data });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

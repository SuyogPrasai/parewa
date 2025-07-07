import { NextRequest, NextResponse } from "next/server";
import { getNoticesHandler } from "@/lib/handlers/getNotices";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getNoticesHandler(searchParams);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching notices:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting notices",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

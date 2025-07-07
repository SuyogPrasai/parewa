import { NextRequest, NextResponse } from "next/server";
import { getNoticeByIdHandler } from "@/lib/handlers/getNotice";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing ID parameter",
      },
      { status: 400 }
    );
  }

  try {
    const result = await getNoticeByIdHandler(id);

    return NextResponse.json(
      {
        success: result.success,
        ...(result.success ? { notice: result.notice } : { message: result.message }),
      },
      { status: result.status }
    );
  } catch (error: any) {
    console.error("Error fetching notice by ID:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting notices",
      },
      { status: 400 }
    );
  }
}

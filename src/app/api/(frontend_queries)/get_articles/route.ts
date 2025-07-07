import { NextRequest, NextResponse } from "next/server";
import { getArticlesHandler } from "@/lib/handlers/getArticles";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getArticlesHandler(searchParams);

    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error fetching articles:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting articles",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

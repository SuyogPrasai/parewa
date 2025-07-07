import { NextRequest, NextResponse } from "next/server";
import { getSingleArticleHandler } from "@/lib/handlers/getArticle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Article ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await getSingleArticleHandler(id);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error fetching article:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting article",
      },
      { status: 400 }
    );
  }
}

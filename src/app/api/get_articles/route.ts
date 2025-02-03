import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnnect";
import ArticleModel from "@/models/Article";


export async function GET(request: NextRequest) {
    await dbConnect();

    try {
    // Need to implementing lazy loading algorithms in here
    // TODO: work needs to be done here



    } catch (error: any) {
        console.log("Error fetching articles")
        return NextResponse.json({
            success: false,
            message: "Error getting articles"
        },
            { status: 400 }
        )
    }
}
import dbConnect from "@/lib/dbConnnect";
import { NextResponse, NextRequest } from "next/server";
import NoticeModel from "@/models/Notice";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const notices = await NoticeModel.aggregate([
            { $sort: { createdAt: -1 } }, // Sort by latest createdAt
            { $limit: 4 } // Get only 4 latest notices
        ]);

        return NextResponse.json(
            { success: true, notices },
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

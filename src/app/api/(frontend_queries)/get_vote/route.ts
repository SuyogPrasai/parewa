import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import VoteModel, { VoteDB } from "@/models/Vote";

export async function GET(request: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const post_id = searchParams.get("post_id");

    if (!user_id || !post_id) {
        return NextResponse.json(
            {
                success: false,
                message: "user_id and post_id are required",
            },
            { status: 400 }
        );
    }

    try {
        const vote: VoteDB | null = await VoteModel.findOne({ post_id, user_id });

        if (!vote) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Vote not found",
                },
                { status: 404 }
            );
        }

        const response_vote = {
            id: vote._id,
            post_type: vote.post_type,
            post_id: vote.post_id,
            user_id: vote.user_id,
            vote: vote.vote,
            updatedAt: vote.updatedAt,
            createdAt: vote.createdAt,
        };

        return NextResponse.json(
            {
                success: true,
                vote: response_vote,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching vote from the database:", error.message, error.stack);
        return NextResponse.json(
            {
                success: false,
                message: "Error getting vote",
            },
            { status: 400 }
        );
    }
}
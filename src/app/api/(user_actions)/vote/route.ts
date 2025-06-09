import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";

import ArticleModel from "@/models/Article";
import NoticeModel from "@/models/Notice";
import VoteModel from "@/models/Vote";
import { init } from "next/dist/compiled/webpack/webpack";

interface Vote {
    post_type: string;
    post_id: string;
    vote: number;
}

export async function POST(request: NextRequest) {
    await dbConnect(); // Ensure DB connection
    try {
        const {
            user_id,
            post_id,
            post_type,
            vote
        } = await request.json();

        console.log(post_type)
        if (post_type !== "article" && post_type !== "notice") {
            console.log("Invalid post type | It must be article or notice");
            return NextResponse.json(
                { success: false, message: "Invalid post type" },
                { status: 400 }
            );
        }

        // Search the database if the vote for that user and at that post exits
        // user_id && post_id == PRIMARY KEY 

        const initialVote = await VoteModel.findOne(
            { user_id, post_id, post_type }
        )

        const initialVoteNumber = initialVote?.vote || 0;

        const updateVote = await VoteModel.findOneAndUpdate(
            { user_id, post_id, post_type },
            { $set: { vote } },
            { upsert: true, new: true }
        )

        const currentVoteNumber = updateVote?.vote;

        if (post_type === "article") {
            const article = await ArticleModel.findById(post_id);
            if (article) {
                const voteCount = article.voteCount ?? 0;
                if (initialVoteNumber !== currentVoteNumber) {
                    const diff = currentVoteNumber - initialVoteNumber;
                    const new_vote = voteCount + diff;
                    await ArticleModel.updateOne({ _id: post_id }, { $set: { voteCount: new_vote } });
                }
            } else {
                console.log("Article not found");
                return NextResponse.json(
                    { success: false, message: "Article not found" },
                    { status: 404 }
                );
            }

        } else if (post_type === "notice") {
            const notice = await NoticeModel.findById(post_id);
            if (notice) {
                const voteCount = notice.voteCount ?? 0;
                if (initialVoteNumber !== currentVoteNumber) {
                    const diff = currentVoteNumber - initialVoteNumber;
                    const new_vote = voteCount + diff;
                    await NoticeModel.updateOne({ _id: post_id }, { $set: { voteCount: new_vote } });
                }
            } else {
                console.log("Notice not found");
                return NextResponse.json(
                    { success: false, message: "Notice not found" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { success: true, message: "Vote updated successfully" },
            { status: 200 }
        );
    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to cast vote" },
            { status: 500 }
        );
    }
}

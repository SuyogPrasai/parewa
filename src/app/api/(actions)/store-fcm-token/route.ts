import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import FcmTokenModel from "@/models/FcmTokens";

export async function POST(request: NextRequest) {
    await dbConnect(); // Ensure DB connection
    try {
        const { token } = await request.json();

        const fcmTokem = await FcmTokenModel.findOne({ token });
        if ( fcmTokem ) {
            console.log("FcmToken already exists");
            return NextResponse.json(
                { success: true, message: "FcmToken already exists" },
                { status: 200 }
            )
        }

        const newToken = new FcmTokenModel({ token });
        await newToken.save();
        console.log("Token added successfully");
        return NextResponse.json(
            { success: true, message: "Token added successfully" },
            { status: 200 }
        );
    }

    catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to add token" },
            { status: 500 }
        );
    }
}

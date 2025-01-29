import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnnect";
import UserModel from "@/models/User";

export async function POST(request: NextRequest){

    dbConnect();

    try {

        const { email } = await request.json()
        
        // Find if the user by that email exists or not
            // if the user exists the databse then respond error
            // ELSE then send an otp verifying that email address   
            // The otp send to that email must contain a otp and a verify expiry of 15 minutes
                // If the otp is entered correctly then allow the user to set the password
                // ELse allow reentering the otp for 5 times,
    }
    catch(error: any) {
        console.log(`Error Signing Up the user [${error}]`)
        return NextResponse.json(
            {
                success: false,
                message: "Error Signing Up the User"
            },
            {
                status: 500
            }
        )
    }
}
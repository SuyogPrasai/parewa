import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnnect";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  dbConnect(); // Ensure DB connection

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword, isVerified: true },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error signing up the user: ${error.message}`);
    return NextResponse.json(
      { success: false, message: "Error signing up the user" },
      { status: 500 }
    );
  }
}

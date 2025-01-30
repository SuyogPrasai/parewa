import dbConnect from "@/lib/dbConnnect";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  dbConnect(); // Ensure DB connection

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found in the database. Contact Admin." },
        { status: 400 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email is already verified and cannot be used for sign-up." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Email is available for sign-up." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error checking email: ${error.message}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

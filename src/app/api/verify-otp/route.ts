import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnnect";
import OtpModel from "@/models/Otp";

export async function POST(req: Request) {
  dbConnect(); // Ensure DB connection
  try {

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    // Find and delete OTP in one step
    const storedOtp = await OtpModel.findOneAndDelete({ email });

    if (!storedOtp) {
      return NextResponse.json({ error: "OTP not found. Please request a new one." }, { status: 400 });
    }

    // Check if OTP is expired
    if (storedOtp.expiresAt && storedOtp.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired. Request a new one." }, { status: 400 });
    }

    // Validate OTP
    if (storedOtp.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP verified successfully!" });
  } catch (error: any) {
    console.error(`Error verifying OTP: ${error.message}`);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

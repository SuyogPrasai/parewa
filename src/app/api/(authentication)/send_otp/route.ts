import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/lib/emails/send-verification-email";
import OtpModel from "@/models/Otp";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect(); // Ensure DB connection
  try {

    const { email } = await req.json();

    if (!email) {
      console.log("Email is required.");
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp: string = String(Math.floor(100000 + Math.random() * 900000));
    console.log(typeof otp);

    // Set OTP expiration (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Delete any existing OTPs for this email
    await OtpModel.deleteMany({ email });

    // Save new OTP in DB
    await OtpModel.create({ email, otp: otp, expiresAt, createdAt: new Date() });

    // Send email
    const emailResponse = await sendVerificationEmail(email, otp);
    if (!emailResponse.success) {
      console.error(`Error sending OTP: ${emailResponse.message}`);
      return NextResponse.json({ error: "Failed to send OTP. Try again." }, { status: 500 });
    }

    console.log("OTP sent successfully.");
    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (error: any) {
    console.error(`Error sending OTP: ${error.message}`);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

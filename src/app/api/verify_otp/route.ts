import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OtpModel from "@/models/Otp";
import { otpSchema } from "@/schemas/otpSchema";
import { updateSignUpSession } from "@/lib/session"

export async function POST(req: Request) {
	await dbConnect(); // Ensure DB connection
	try {

		const { email, otp } = await req.json();

		if (!email || !otp) {
			console.log("Email and OTP are required.");
			return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
		}

		const result = otpSchema.safeParse({ otp });
		if (!result.success) {
			const otpErrors = result.error.format().otp?._errors || [];
			console.log(result.error.format());
			return Response.json(
				{
					success: false,
					message: otpErrors?.length > 0 ? otpErrors.join(', ') : 'Invalid query parameters'
				},
				{ status: 400 });
		}


		// Find and delete OTP in one step
		const storedOtp = await OtpModel.findOne({ email });
		console.log(storedOtp)

		if (!storedOtp) {
			console.log("OTP not found. Please request a new one.");
			return NextResponse.json({ error: "OTP not found. Please request a new one." }, { status: 400 });
		}

		// Check if OTP is expired
		if (storedOtp.expiresAt && storedOtp.expiresAt < new Date()) {
			console.log("OTP expired. Request a new one.");
			return NextResponse.json({ error: "OTP expired. Request a new one." }, { status: 400 });
		}

		console.log(storedOtp.otp)
		console.log(otp)
		if (storedOtp.otp.toString() !== otp) {
			console.log("Invalid OTP. Please try again.");
			return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
		}
		storedOtp.deleteOne();
		console.log("OTP verified successfully!");
		// Cookie stuff
		await updateSignUpSession({ verify_otp: true});
		return NextResponse.json({ message: "OTPs verified successfully!" });
	} catch (error: any) {
		console.error(`Error verifying OTP: ${error.message}`);
		return NextResponse.json(
			{ error: "Internal server error. Please try again later." },
			{ status: 500 }
		);
	}
}

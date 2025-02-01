import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { emailVerifySchema } from "@/schemas/emailVerifySchema";
import { deleteSignUpSession, createSignUpSession, updateSignUpSession } from "@/lib/session"

export async function GET(req: Request) {
	await dbConnect(); // Ensure DB connection

	try {
		const { searchParams } = new URL(req.url);
		let email = searchParams.get("email");



		if (!email) {
			console.log("Email is required.");
			return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
		}

		email = email.toLowerCase();

		const email_result = emailVerifySchema.safeParse({ email });
		if (!email_result.success) {
			const emailErrors = email_result.error.format().email?._errors || [];
			console.log(emailErrors);
			console.log("Error validating email: " + email_result.error.format());
			return Response.json(
				{
					success: false,
					message: emailErrors?.length > 0 ? emailErrors.join(', ') : 'Invalid query parameters'
				},
				{ status: 400 });
		}


		// Check if user exists
		const user = await UserModel.findOne({ email });

		if (!user) {
			console.log("Email not found in the database. Contact Admin.");
			return NextResponse.json(
				{ success: false, message: "Email not found in the database. Contact Admin." },
				{ status: 400 }
			);
		}

		if (user.isVerified) {
			console.log("Email is already verified and cannot be used for sign-up.");
			return NextResponse.json(
				{ success: false, message: "Email is already verified and cannot be used for sign-up." },
				{ status: 400 }
			);
		}

		console.log("Email is available for sign-up.");
		// Cookie logic
		await deleteSignUpSession(); // Deleting any existing signp sessions
		await createSignUpSession(email);
		await updateSignUpSession({ verify_email: true});
		
		return NextResponse.json(
			{ success: true, message: "Email is available for sign-up." },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error(`Error checking email: ${error.message}`);
		return NextResponse.json(
			{ success: false, message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
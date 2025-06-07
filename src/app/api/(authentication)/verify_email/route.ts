import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { extractRollAndName } from "@/helpers/extract-name-and-email";

import { emailVerifySchema } from "@/schemas/emailVerifySchema";
import { deleteSignUpSession, createSignUpSession, updateSignUpSession } from "@/lib/session"

export async function GET(req: NextRequest) {
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

		// Extract roll and name from email
		const result = extractRollAndName(email);
		const user = await UserModel.findOne({ email });

		if (!result) {
			if (user) {
				if (user.isVerified) {
					return NextResponse.json(
						{ success: false, message: "Email is already verified and cannot be used for sign-up." },
						{ status: 400 }
					);
				}
			} else {
				return NextResponse.json(
					{ success: false, message: "No user found with such an email, contact Admin" },
					{ status: 400 }
				);
			}
		} else {
			const { roll,  } = result;
			if (user) {
				if (user.isVerified) {
					return NextResponse.json(
						{ success: false, message: "Email is already verified and cannot be used for sign-up." },
						{ status: 400 }
					);
				}
			}

			const existingUser = await UserModel.findOne({ rollNumber: roll });

			if (existingUser) {
				return NextResponse.json(
					{ success: false, message: "A user with this roll number exists. Check your email." },
					{ status: 400 }
				);
			}
		}
		// Cookie logic
		await deleteSignUpSession(); // Deleting any existing signp sessions
		await createSignUpSession(email);
		await updateSignUpSession({ verify_email: true });

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
import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnnect";
import UserModel from "@/models/User";
import { emailVerifySchema } from "@/schemas/emailVerifySchema";

export async function POST(req: Request) {
	dbConnect(); // Ensure DB connection

	try {
		let { email } = await req.json();
		email = email.toLowerCase();

		if (!email) {
			console.log("Email is required.");
			return NextResponse.json({ message: "Email is required" }, { status: 400 });
		}

		const result = emailVerifySchema.safeParse({email});
		if (!result.success) {
			const emailErrors = result.error.format().email?._errors || [];
			console.log(result.error.format());
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
				{ message: "Email not found in the database. Contact Admin." },
				{ status: 400 }
			);
		}

		if (user.isVerified) {
			console.log("Email is already verified and cannot be used for sign-up.");
			return NextResponse.json(
				{ message: "Email is already verified and cannot be used for sign-up." },
				{ status: 400 }
			);
		}

		console.log("Email is available for sign-up.");
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

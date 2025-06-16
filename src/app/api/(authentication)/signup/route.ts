import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { updateSignUpSession, deleteSignUpSession } from "@/lib/session"
import { extractRollAndName } from "@/helpers/extract-name-and-email";

import { emailVerifySchema } from "@/schemas/emailVerifySchema";
import { setPasswordSchema } from "@/schemas/setPasswordSchema";

export async function POST(request: NextRequest) {
	await dbConnect(); // Ensure DB connection

	try {
		let { email, password, confirm_password } = await request.json();

		email = email.toLowerCase();

		if (!email || !password || !confirm_password) {
			console.log("Email and password are required");
			return NextResponse.json(
				{ success: false, message: "Email and password are required" },
				{ status: 400 }
			);
		}

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

		const pass_result = setPasswordSchema.safeParse({ password, confirm_password });
		console.log(pass_result);
		if (!pass_result.success) {
			const passErrors = pass_result.error.format().password?._errors || [];
			console.log(passErrors);
			console.log(" Error validating password: " + pass_result.error.format());
			return Response.json(
				{
					success: false,
					message: passErrors?.length > 0 ? passErrors.join(', ') : 'Invalid query parameters'
				},
				{ status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await UserModel.findOne({ email })
		if (user) {
			const updatedUser = await UserModel.findOneAndUpdate(
				{ email },
				{ password: hashedPassword, isVerified: true },
				{ new: true } // Return the updated document
			);
		
			if (!updatedUser) {
				console.log("User not found");
				return NextResponse.json(
					{ success: false, message: "User not found" },
					{ status: 404 }
				);
			}
		} else {
			const result = extractRollAndName(email);
			
			if (!result) {
				return NextResponse.json(
					{ success: false, message: "Invalid email sent!" },
					{ status: 400 }
				);
			}
		
			const { roll, name } = result;
			const username = roll + name;
			
			const newUser = await UserModel.create({
				username,
				name,
				email,
				UsertagIDS: [], 
				password: hashedPassword,
				roleID: "student", 
				rollNumber: roll,
				articleIDS: [],
				isVerified: true,
			});
		}

		await updateSignUpSession({ set_password: true });
		await deleteSignUpSession();

		console.log("User updated successfully");
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

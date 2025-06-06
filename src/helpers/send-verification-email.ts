import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/api-responses";

export async function sendVerificationEmail(
    email: string,
    verifyCode: string,
) : Promise<ApiResponse> {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Email | Parewa ',
            react: VerificationEmail({otp: verifyCode}),
          });

        return {
            success: true,
            message: "Verification Email Sent"
        }
    }
    catch (emailError) {
        console.log("Error Sending Verification Email");
        return {
            success: false,
            message: "Error Sending Verification Emailk"
        }
    }
}
import { render } from '@react-email/render';
import { NodeMailer } from "@/lib/nodemailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/api-responses";

export async function sendVerificationEmail(
    email: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        const emailHtml = await render(VerificationEmail({ otp: verifyCode }));

        const mailOptions = {
            from: process.env.GMAIL_EMAIL || 'parewa.noreply@gmail.com',
            to: email,
            subject: 'Verification Email | Parewa',
            html: emailHtml,
        };

        const info = await NodeMailer.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);

        return {
            success: true,
            message: "Verification Email Sent"
        };
    } catch (emailError) {
        console.log("Error Sending Verification Email", emailError);
        return {
            success: false,
            message: "Error Sending Verification Email"
        };
    }
}
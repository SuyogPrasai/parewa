import { NodeMailer } from "@/lib/nodemailer";
import NoticeEmail from "@/emails/NoticeNewsletter";

import { ApiResponse } from '@/types/api-responses';
import Notice from "@/types/post_objects/notice";

import { render } from '@react-email/render';

import NewsletterModel from "@/models/Newsletter";

export async function sendNoticeNewsLetters( notice: Notice ): Promise<ApiResponse> {
    try {
        const {
            _id,
            title,
            content,
            publishedIn,

            featuredImage,
            publisherID,
            postTags,
            updatedAt,
            category,
            publisher,
        } = notice;

        // Publisher Details
        const publisher_name = publisher?.[0]?.name ?? "Unknown";
        const publisher_username = publisher?.[0]?.username ?? "unknown";
        const publisher_role = publisher?.[0]?.role ?? "unknown";
        const publisher_position = publisher?.[0]?.position ?? "unknown";

        const pipeline = [
            {
                $match: {
                    notices: true,
                },
            },
            {
                $project: {
                    email: 1,
                    _id: 0, // Exclude _id field
                },
            },
        ];

        const emails = await NewsletterModel.aggregate(pipeline).exec();


        const html = render(
            <NoticeEmail
                notice
            />
        );
        // Use Promise.all to await all email sends and collect results
        await Promise.all(
            emails.map(async (email) => {
                try {
                    const info = await NodeMailer.sendMail({
                        from: `"Parewa" <${process.env.GMAIL_USER}>`,
                        to: email.email,
                        subject: 'Notice Newsletter | Parewa ',
                        html: NoticeEmail({ 
                            title: title ?? "", 
                            content: content ?? "", 
                            publishedIn: publishedIn.toString() ?? "", 
                            publisherName: publisher_name ?? "", 
                            publisherPosition: publisher_position ?? "" 
                        }),
                    });
                    // Optionally handle data/error here
                } catch (emailError) {
                    console.log("Error Sending Notice Newsletter to", email.email);
                }
            })
        );

        return {
            success: true,
            message: "Successfully sent notice newsletter"
        };

    } catch (emailError) {
        console.log("Error Sending Notice Newsletter");
        return {
            success: false,
            message: "Error Sending Notice Newsletter"
        }
    }
}
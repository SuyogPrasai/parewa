import { render } from '@react-email/render';
import { NodeMailer } from "@/lib/nodemailer";
import NoticeEmail from "@/emails/NoticeNewsletter";

import { ApiResponse } from '@/types/api-responses';
import Notice from "@/types/post_objects/notice";

import NewsletterModel from "@/models/Newsletter";
import UserModel from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

export async function sendNoticeNewsLetters(notice: Notice): Promise<ApiResponse> {
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
        } = notice;

        const publisher = await UserModel.findById(publisherID);
        const publisher_name = publisher?.name ?? "unknown";
        const publisher_username = publisher?.username ?? "unknown";
        const publisher_roleID = publisher?.roleID ?? "unknown";
        const publisher_positionID = publisher?.positionID ?? "unknown";

        const role = await RoleModel.findById(publisher_roleID);
        const publisher_role = role?.name ?? "unknown";

        const position = await PositionModel.findById(publisher_positionID);
        const publisher_position = position?.name ?? "unknown";

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

        const emailProps = {
            title: title,
            content: content ?? "",
            publishedIn: publishedIn.toDateString(),
            publisherName: publisher_name,
            publisherPosition: publisher_position,
        };

        const email_html = await render(NoticeEmail(emailProps))
        const emails = await NewsletterModel.aggregate(pipeline).exec();

        
        const attached_image = [
            {
                path: featuredImage
            }
        ]
        await Promise.all(emails.map(async (email) => {
            try {
                const mailOptions = {
                    from: process.env.GMAIL_EMAIL || 'parewa.noreply@gmail.com',
                    to: email.email,
                    subject: emailProps.title + " | " +  'Parewa Notice',
                    html: email_html,
                    attachments: attached_image
                };
                const info = await NodeMailer.sendMail(mailOptions);
                console.log('Email sent: ' + info.messageId);
            } catch (emailError) {
                console.log("Error sending this email", emailError);
            }
        }));
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
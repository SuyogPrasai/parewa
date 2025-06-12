import { render } from '@react-email/render';
import { NodeMailer } from "@/lib/nodemailer";
import AnnouncementEmail from "@/emails/AnnouncementNewsletter";

import { ApiResponse } from '@/types/api-responses';
import Announcement from "@/types/post_objects/announcement";

import NewsletterModel from "@/models/Newsletter";
import UserModel from "@/models/User";
import RoleModel from "@/models/Role";
import PositionModel from "@/models/Positions";

export async function sendAnnouncementNewsLetters(announcement: Announcement): Promise<ApiResponse> {
    try {
        const {
            _id,
            title,
            content,
            publishedIn,

            publisherID,
            updatedAt,
            category,
        } = announcement;

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
                    announcements: true,
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

        const email_html = await render(AnnouncementEmail(emailProps))
        const emails = await NewsletterModel.aggregate(pipeline).exec();

        
        await Promise.all(emails.map(async (email) => {
            try {
                const mailOptions = {
                    from: process.env.GMAIL_EMAIL || 'parewa.noreply@gmail.com',
                    to: email.email,
                    subject: emailProps.title + " | " +  'Parewa Announcement',
                    html: email_html,
                };
                const info = await NodeMailer.sendMail(mailOptions);
                console.log('Email sent: ' + info.messageId);
            } catch (emailError) {
                console.log("Error sending this email", emailError);
            }
        }));
        return {
            success: true,
            message: "Successfully sent announcement newsletter"
        };

    } catch (emailError) {
        console.log("Error Sending Announcement Newsletter");
        return {
            success: false,
            message: "Error Sending Announcement Newsletter"
        }
    }
}
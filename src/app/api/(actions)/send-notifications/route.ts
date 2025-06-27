import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import FcmTokenModel from "@/models/FcmTokens";
import dbConnect from "@/lib/dbConnect";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("@/../service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { title, body, url, data } = await request.json();

  try {
    await dbConnect();
    const fcmTokens = await FcmTokenModel.find();

    if (fcmTokens.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No tokens found to send notifications to",
        successCount: 0,
        failureCount: 0,
      });
    }

    const basePayload = {
      data: {
        title,
        body,
        ...(url && { link: url }),
        ...data,
      },
      ...(url && {
        webpush: {
          fcmOptions: {
            link: url,
          },
        },
      }),
    };

    const messages: Message[] = fcmTokens.map(tokenDoc => ({
      token: tokenDoc.token,
      ...basePayload,
    }));

    const response = await admin.messaging().sendEach(messages);

    const tokensToRemove: string[] = [];

    response.responses.forEach((res, idx) => {
      if (!res.success && res.error) {
        const code = res.error.code;
        if (
          code === "messaging/invalid-registration-token" ||
          code === "messaging/registration-token-not-registered" ||
          code === "messaging/invalid-argument"
        ) {
          tokensToRemove.push(fcmTokens[idx].token);
        }
      }
    });

    if (tokensToRemove.length > 0) {
      await FcmTokenModel.deleteMany({ token: { $in: tokensToRemove } });
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${response.successCount}, failed ${response.failureCount}`,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
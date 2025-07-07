import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "firebase-admin/messaging";
import fs from "fs";
import path from "path";

if (!admin.apps.length) {
  // Adjust this relative path based on your file location and service_key.json location
  const serviceKeyPath = path.resolve(process.cwd(), "service_key.json");

  let serviceAccount;

  if (fs.existsSync(serviceKeyPath)) {
    serviceAccount = require(serviceKeyPath);
  } else {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    } catch {
      serviceAccount = null;
    }
  }

  if (serviceAccount && Object.keys(serviceAccount).length > 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.error("Firebase service account not found or invalid!");
    // Optionally throw error or handle it based on your use case
  }
}


export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

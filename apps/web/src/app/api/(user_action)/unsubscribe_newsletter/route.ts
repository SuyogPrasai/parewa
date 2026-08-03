import { NextRequest, NextResponse } from "next/server";
import { defineQuery } from "next-sanity";
import { z } from "zod";

import { client } from "@/sanity/client";
import { subscribeNewsletterSchema } from "@/schemas/frontend_schemas/newsletterSchema";

const UNSUBSCRIBE_NEWSLETTER_QUERY = defineQuery(`
  *[_type == "newsletterEmail" && email == $email]{
    _id,
    email,
    subscribed
  }[0]
`)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const schemaVerification = subscribeNewsletterSchema.safeParse(body);

    if (!schemaVerification.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format.",
          errors: z.treeifyError(schemaVerification.error),
        },
        { status: 400 }
      );
    }

    const { email } = schemaVerification.data;

    const existingSubscription = await client.fetch(UNSUBSCRIBE_NEWSLETTER_QUERY, { email });

    if (!existingSubscription) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is not subscribed to the newsletter",
          route: "/api/unsubscribe_newsletter",
          email,
        },
        { status: 404 }
      );
    }

    if (!existingSubscription.subscribed) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already unsubscribed from the newsletter",
          route: "/api/unsubscribe_newsletter",
          email,
        },
        { status: 400 }
      );
    }

    await client.patch(existingSubscription._id).set({ subscribed: false }).commit();

    return NextResponse.json({
      success: true,
      message: "Email unsubscribed from newsletter successfully",
      route: "/api/unsubscribe_newsletter",
      email,
    });
  } catch (error) {
    console.error("Error in POST /api/unsubscribe_newsletter:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { defineQuery } from "next-sanity";
import { z } from "zod";

import { client } from "@/sanity/client";
import { subscribeNewsletterSchema } from "@/schemas/frontend_schemas/newsletterSchema";

const SUBSCRIBE_NEWSLETTER_QUERY = defineQuery(`
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

    const existingSubscription = await client.fetch(SUBSCRIBE_NEWSLETTER_QUERY, { email });

    if (existingSubscription && existingSubscription.subscribed) {
      return NextResponse.json({
        success: false,
        message: "Email is already subscribed to the newsletter",
        route: "/api/subscribe_newsletter",
        email,
      },
        { status: 400 }
      );
    }

    if (!existingSubscription) {
      await client.create({
        _type: "newsletterEmail",
        email,
        subscribed: true
      });
    } else {
      await client.patch(existingSubscription._id)
        .set({ subscribed: true })
        .commit();
    }

    return NextResponse.json({
      success: true,
      message: "Email received for newsletter subscription",
      route: "/api/subscribe_newsletter",
      email,
    });
  } catch (error) {
    console.error("Error in POST /api/subscribe_newsletter:", error);
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

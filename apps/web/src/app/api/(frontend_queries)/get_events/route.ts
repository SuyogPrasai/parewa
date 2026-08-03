import { NextRequest, NextResponse } from "next/server";
import { defineQuery } from "next-sanity";
import { z } from "zod";

import { client } from "@/sanity/client";
import { DateStringSchema } from "@/schemas/backend_schemas/dateStringSchema";

const GET_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= $startDate && date < $endDate]{
    date,
    location,
    "slug": slug.current,
    title
  }
`)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Let's just by default convert the date to NPT
    // Date String "yyyy-mm-dd" is expected
    // We return the list of events happing at that date

    // The Data in Sanity's Content Lake is always stoed in UTC
    // So, wee need to convert the date on the frontend side to UTC then request, and convert back to local time

    const date = searchParams.get("date");

    const schemaVerification = DateStringSchema.safeParse(date);

    if (!schemaVerification.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid date format. Expected format: yyyy-mm-dd",
        errors: z.treeifyError(schemaVerification.error),
      },
        { status: 400 }
      );
    }

    // Parse the UTC date string directly without timezone assumptions
    const utcDate = new Date(`${schemaVerification.data}T00:00:00Z`).toISOString();

    const endDate = new Date(utcDate);

    endDate.setUTCDate(endDate.getUTCDate() + 1);

    const endDateString = endDate.toISOString();

    const events = await client.fetch(GET_EVENTS_QUERY,
      {
        startDate: utcDate,
        endDate: endDateString,
      }
    )

    return NextResponse.json({
      success: true,
      message: "Events fetched successfully",
      events,
      route: "/api/get_events",
      query: Object.fromEntries(searchParams.entries()),
    });
  } catch (error) {
    console.error("Error in GET /api/get_events:", error);
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

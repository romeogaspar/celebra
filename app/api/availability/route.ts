import { NextResponse } from "next/server";
import { getBlockedDates } from "@/lib/queries";

// GET — return all blocked dates
export async function GET() {
  try {
    const dates = await getBlockedDates();
    return NextResponse.json(dates);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/queries";

export async function GET() {
  try {
    const data = await getAllBookings();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const booking = await createBooking({
      clientName: body.clientName,
      email:      body.email,
      phone:      body.phone,
      eventType:  body.eventType,
      package:    body.package,
      eventDate:  body.eventDate,
      guests:     body.guests,
      message:    body.message,
      status:     "pending",
    });

    // email temporarily disabled for testing
    // await sendBookingNotification({...});

    return NextResponse.json(booking);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
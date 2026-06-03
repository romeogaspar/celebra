import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/queries";
import { sendBookingNotification } from "@/lib/email";

// GET — fetch all bookings (for admin dashboard)
export async function GET() {
  try {
    const data = await getAllBookings();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

// POST — create a new booking (from booking form)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const booking = await createBooking({
      clientName: body.clientName,
      email: body.email,
      phone: body.phone,
      eventType: body.eventType,
      package: body.package,
      eventDate: body.eventDate,
      guests: body.guests,
      message: body.message,
      status: "pending",
    });

    // Send admin notification email
    await sendBookingNotification({
      clientName: body.clientName,
      email:      body.email,
      phone:      body.phone,
      eventType:  body.eventType,
      package:    body.package,
      eventDate:  body.eventDate,
      guests:     body.guests,
      message:    body.message,
    });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

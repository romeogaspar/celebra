import { NextResponse } from "next/server";
import { updateBookingStatus, getBookingById } from "@/lib/queries";
import { sendConfirmationEmail, sendDeclinedEmail } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    await updateBookingStatus(Number(id), status);

    // Fetch booking details to send email
    const booking = await getBookingById(Number(id));

    if (booking && status === "confirmed") {
      await sendConfirmationEmail({
        clientName: booking.clientName ?? "",
        email:      booking.email ?? "",
        eventType:  booking.eventType ?? "",
        package:    booking.package ?? "",
        eventDate:  booking.eventDate ?? "",
        guests:     booking.guests ?? 0,
      });
    }

    if (booking && status === "declined") {
      await sendDeclinedEmail({
        clientName: booking.clientName ?? "",
        email:      booking.email ?? "",
        eventDate:  booking.eventDate ?? "",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email to admin when new booking is submitted
export async function sendBookingNotification(booking: {
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  package: string;
  eventDate: string;
  guests: number;
  message: string;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: "gasparromeo@gmail.com", // your email
    subject: `New Booking Request — ${booking.clientName}`,
    html: `
      <h2>New Booking Request</h2>
      <table>
        <tr><td><strong>Client</strong></td><td>${booking.clientName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${booking.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${booking.phone}</td></tr>
        <tr><td><strong>Event</strong></td><td>${booking.eventType}</td></tr>
        <tr><td><strong>Package</strong></td><td>${booking.package}</td></tr>
        <tr><td><strong>Date</strong></td><td>${booking.eventDate}</td></tr>
        <tr><td><strong>Guests</strong></td><td>${booking.guests}</td></tr>
        <tr><td><strong>Message</strong></td><td>${booking.message || "—"}</td></tr>
      </table>
      <br/>
      <a href="http://localhost:3000/admin">View in Admin Dashboard →</a>
    `,
  });
}

// Email to client when booking is confirmed
export async function sendConfirmationEmail(booking: {
  clientName: string;
  email: string;
  eventType: string;
  package: string;
  eventDate: string;
  guests: number;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: booking.email,
    subject: `Your Booking is Confirmed — Celebra Events`,
    html: `
      <h2>Your booking is confirmed! ✦</h2>
      <p>Dear ${booking.clientName},</p>
      <p>We are delighted to confirm your event with Celebra Events.</p>
      <table>
        <tr><td><strong>Event</strong></td><td>${booking.eventType}</td></tr>
        <tr><td><strong>Package</strong></td><td>${booking.package}</td></tr>
        <tr><td><strong>Date</strong></td><td>${booking.eventDate}</td></tr>
        <tr><td><strong>Guests</strong></td><td>${booking.guests}</td></tr>
      </table>
      <br/>
      <p>Our team will be in touch shortly to discuss further details.</p>
      <p>Thank you for choosing Celebra Events.</p>
    `,
  });
}

// Email to client when booking is declined
export async function sendDeclinedEmail(booking: {
  clientName: string;
  email: string;
  eventDate: string;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: booking.email,
    subject: `Booking Update — Celebra Events`,
    html: `
      <h2>Booking Update</h2>
      <p>Dear ${booking.clientName},</p>
      <p>Unfortunately we are unable to accommodate your booking for <strong>${booking.eventDate}</strong>.</p>
      <p>Please contact us to discuss alternative dates or arrangements.</p>
      <p>We apologise for any inconvenience.</p>
    `,
  });
}

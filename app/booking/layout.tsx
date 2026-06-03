import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Book an Event — Celebra Events",
  description: "Plan your perfect wedding, birthday, or private event with Celebra. Choose your package and submit your enquiry in minutes.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
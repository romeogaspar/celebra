import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Celebra Events — Extraordinary Celebrations",
  description: "From intimate birthday gatherings to grand wedding receptions, Celebra designs events that linger long after the last dance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
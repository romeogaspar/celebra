import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Celebra Events — Extraordinary Celebrations in the Philippines",
  description: "From intimate birthday gatherings to grand wedding receptions — Celebra designs events that linger long after the last dance. Based in Dasmariñas, Cavite.",
  keywords:    ["event planning Philippines", "wedding planner Cavite", "birthday party planner", "private events Manila", "Celebra Events"],
  authors:     [{ name: "Celebra Events" }],
  openGraph: {
    title:       "Celebra Events — Extraordinary Celebrations",
    description: "From intimate birthday gatherings to grand wedding receptions — we design events that linger long after the last dance.",
    url:         "https://celebra-brown.vercel.app",
    siteName:    "Celebra Events",
    locale:      "en_PH",
    type:        "website",
    images: [
      {
        url:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
        width:  1200,
        height: 630,
        alt:    "Celebra Events",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Celebra Events — Extraordinary Celebrations",
    description: "From intimate birthday gatherings to grand wedding receptions.",
    images:      ["https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"],
  },
  metadataBase: new URL("https://celebra-brown.vercel.app"),
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
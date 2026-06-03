import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Gallery — Celebra Events",
  description: "Browse our portfolio of weddings, birthdays, and private celebrations. Every event tells a story.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import { db } from "./db";
import { bookings, blockedDates } from "./schema";
import { eq } from "drizzle-orm";

export async function getAllBookings() {
  return await db.select().from(bookings).orderBy(bookings.createdAt);
}

export async function createBooking(data: typeof bookings.$inferInsert) {
  return await db.insert(bookings).values(data).returning();
}

export async function updateBookingStatus(id: number, status: string) {
  return await db.update(bookings).set({ status }).where(eq(bookings.id, id));
}

export async function getBlockedDates() {
  return await db.select().from(blockedDates);
}

export async function getBookingById(id: number) {
  const result = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);
  return result[0] ?? null;
}

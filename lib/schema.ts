import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  eventType: varchar("event_type", { length: 100 }),
  package: varchar("package", { length: 100 }),
  eventDate: date("event_date"),
  guests: integer("guests"),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  price: integer("price"),
  description: text("description"),
});

export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  date: date("date").unique(),
  reason: varchar("reason", { length: 255 }),
});

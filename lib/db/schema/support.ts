import { pgTable, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";

/**
 * Support inbox — messages submitted from /contact and /support forms.
 * Admin replies create entries in communication.messages via support service.
 */
export const supportMessages = pgTable(
  "support_messages",
  {
    id: text("id").primaryKey(),
    source: text("source").notNull(),
    name: text("name"),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    status: text("status").notNull().default("pending"),
    assignedTo: text("assigned_to"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    statusIdx: index("support_messages_status_idx").on(table.status),
    emailIdx: index("support_messages_email_idx").on(table.email),
  }),
);

/**
 * Account deletion requests — public form submits here, admin processes.
 * Compliant with App Store / Play Store account deletion requirements.
 */
export const deletionRequests = pgTable(
  "deletion_requests",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    email: text("email").notNull(),
    reason: text("reason"),
    status: text("status").notNull().default("pending"),
    requestedAt: timestamp("requested_at").notNull().defaultNow(),
    processedAt: timestamp("processed_at"),
    processedBy: text("processed_by"),
    notes: text("notes"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  },
  (table) => ({
    statusIdx: index("deletion_requests_status_idx").on(table.status),
    emailIdx: index("deletion_requests_email_idx").on(table.email),
  }),
);

import {
  pgTable,
  text,
  timestamp,
  jsonb,
  boolean,
  index,
} from "drizzle-orm/pg-core";

/**
 * Extended user profile — operational data NOT owned by Clerk.
 * Clerk owns auth identity; this table owns business attributes.
 * One row per user (1:1 with users.id).
 */
export const userProfiles = pgTable(
  "user_profiles",
  {
    userId: text("user_id").primaryKey(),
    displayName: text("display_name"),
    avatarMediaId: text("avatar_media_id"),
    phone: text("phone"),
    locale: text("locale").default("es"),
    timezone: text("timezone").default("America/Mexico_City"),
    country: text("country"),
    region: text("region"),
    notificationPrefs: jsonb("notification_prefs")
      .$type<{ email?: boolean; sms?: boolean; whatsapp?: boolean; push?: boolean }>()
      .default({ email: true, sms: false, whatsapp: false, push: true }),
    apiAccessEnabled: boolean("api_access_enabled").notNull().default(false),
    billingProfile: jsonb("billing_profile").$type<Record<string, unknown> | null>(),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    accountStatus: text("account_status").notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    phoneIdx: index("user_profiles_phone_idx").on(table.phone),
    statusIdx: index("user_profiles_status_idx").on(table.accountStatus),
  }),
);

/**
 * User activity history — projection of audit_logs filtered to "user-facing"
 * events plus additional rows that don't fit the strict audit shape.
 * Visible from /app/profile/activity AND admin user detail page.
 */
export const userActivity = pgTable(
  "user_activity",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    summary: text("summary").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("user_activity_user_idx").on(table.userId),
    typeIdx: index("user_activity_type_idx").on(table.type),
    createdIdx: index("user_activity_created_idx").on(table.createdAt),
  }),
);

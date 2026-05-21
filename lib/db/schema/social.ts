import { pgTable, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

/**
 * Social platform links — auto-propagated to footer, contact, share buttons.
 * `platform` matches keys from `config/social.config.ts`.
 */
export const socialLinks = pgTable("social_links", {
  platform: text("platform").primaryKey(),
  url: text("url"),
  label: text("label"),
  enabled: boolean("enabled").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

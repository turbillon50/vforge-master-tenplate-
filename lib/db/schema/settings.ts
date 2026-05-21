import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

/**
 * Key/value app settings — overrides for app.config.ts and branding.config.ts.
 */
export const appSettings = pgTable("app_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<unknown>().notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

/**
 * Universal status definitions — admin can adjust labels/colors per app.
 * Defaults live in `config/statuses.config.ts`.
 */
export const statuses = pgTable("statuses", {
  key: text("key").primaryKey(),
  labelEn: text("label_en").notNull(),
  labelEs: text("label_es").notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  allowedTransitions: jsonb("allowed_transitions").$type<string[]>().default([]).notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

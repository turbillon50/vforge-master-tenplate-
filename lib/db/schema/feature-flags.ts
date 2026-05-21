import { pgTable, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

/**
 * Runtime feature flag overrides. Defaults live in
 * `config/feature-flags.config.ts`. DB takes precedence when present.
 */
export const featureFlags = pgTable("feature_flags", {
  key: text("key").primaryKey(),
  enabled: boolean("enabled").notNull(),
  environment: text("environment").notNull().default("all"),
  scope: text("scope").notNull().default("global"),
  conditions: jsonb("conditions").$type<Record<string, unknown> | null>(),
  description: text("description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

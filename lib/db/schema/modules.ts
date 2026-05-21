import { pgTable, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

/**
 * Per-app runtime overrides for the module registry.
 * Defaults live in `config/modules.config.ts`.
 */
export const moduleSettings = pgTable("module_settings", {
  moduleId: text("module_id").primaryKey(),
  enabled: boolean("enabled").notNull(),
  config: jsonb("config").$type<Record<string, unknown> | null>(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

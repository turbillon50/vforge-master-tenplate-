import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

/**
 * Legal pages — versioned, locale-aware MDX content editable from admin.
 * Slug is PK because the catalog is bounded by `config/legal.config.ts`.
 */
export const legalPages = pgTable("legal_pages", {
  slug: text("slug").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleEs: text("title_es").notNull(),
  bodyEn: text("body_en").notNull(),
  bodyEs: text("body_es").notNull(),
  version: integer("version").notNull().default(1),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

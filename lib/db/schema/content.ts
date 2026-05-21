import { pgTable, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";

/**
 * Editable content blocks — referenced by `<ContentBlock keyName="hero.title" />`.
 * Locale-aware. Admin edits these via Admin → Content Blocks.
 */
export const contentBlocks = pgTable(
  "content_blocks",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull(),
    locale: text("locale").notNull().default("es"),
    type: text("type").notNull().default("text"),
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    updatedBy: text("updated_by"),
  },
  (table) => ({
    keyLocaleIdx: index("content_blocks_key_locale_idx").on(table.key, table.locale),
  }),
);

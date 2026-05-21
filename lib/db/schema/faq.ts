import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const faqCategories = pgTable("faq_categories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameEs: text("name_es").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const faqItems = pgTable(
  "faq_items",
  {
    id: text("id").primaryKey(),
    categoryId: text("category_id")
      .notNull()
      .references(() => faqCategories.id, { onDelete: "cascade" }),
    questionEn: text("question_en").notNull(),
    questionEs: text("question_es").notNull(),
    answerEn: text("answer_en").notNull(),
    answerEs: text("answer_es").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    categoryIdx: index("faq_items_category_idx").on(table.categoryId),
  }),
);

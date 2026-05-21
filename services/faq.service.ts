/**
 * FAQ service — public + admin reads.
 * Falls back to empty array if DB is not configured (build-safe).
 */

import { cache } from "react";
import { db } from "@/lib/db/client";
import { faqCategories, faqItems } from "@/lib/db/schema/faq";
import { eq } from "drizzle-orm";

export interface FAQCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string;
  sortOrder: number;
}

export interface FAQItem {
  id: string;
  categoryId: string;
  categorySlug: string;
  questionEn: string;
  questionEs: string;
  answerEn: string;
  answerEs: string;
  sortOrder: number;
}

export const getPublishedFAQs = cache(async (): Promise<FAQItem[]> => {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = await db
      .select({
        id: faqItems.id,
        categoryId: faqItems.categoryId,
        categorySlug: faqCategories.slug,
        questionEn: faqItems.questionEn,
        questionEs: faqItems.questionEs,
        answerEn: faqItems.answerEn,
        answerEs: faqItems.answerEs,
        sortOrder: faqItems.sortOrder,
      })
      .from(faqItems)
      .leftJoin(faqCategories, eq(faqCategories.id, faqItems.categoryId))
      .where(eq(faqItems.published, true));
    return rows
      .filter((r): r is FAQItem => Boolean(r.categorySlug))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (err) {
    console.error("[faq] load failed", err);
    return [];
  }
});

export const getFAQCategories = cache(async (): Promise<FAQCategory[]> => {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = await db.select().from(faqCategories);
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (err) {
    console.error("[faq:categories] load failed", err);
    return [];
  }
});

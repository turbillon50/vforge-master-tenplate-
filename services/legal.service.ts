/**
 * Legal pages service — reads MDX-as-text from DB, falls back to bundled defaults.
 */

import { cache } from "react";
import { db } from "@/lib/db/client";
import { legalPages as legalTable } from "@/lib/db/schema/legal";
import { eq } from "drizzle-orm";
import type { LegalSlug } from "@/config/legal.config";
import { defaultLegalContent } from "@/config/legal-defaults";

export interface LegalPage {
  slug: LegalSlug;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
  version: number;
  updatedAt: Date;
}

export const getLegalPage = cache(
  async (slug: LegalSlug): Promise<LegalPage> => {
    if (!process.env.DATABASE_URL) return defaultLegalContent[slug];
    try {
      const rows = await db
        .select()
        .from(legalTable)
        .where(eq(legalTable.slug, slug))
        .limit(1);
      const row = rows[0];
      if (!row) return defaultLegalContent[slug];
      return {
        slug: row.slug as LegalSlug,
        titleEn: row.titleEn,
        titleEs: row.titleEs,
        bodyEn: row.bodyEn,
        bodyEs: row.bodyEs,
        version: row.version,
        updatedAt: row.updatedAt,
      };
    } catch (err) {
      console.error(`[legal:${slug}] load failed`, err);
      return defaultLegalContent[slug];
    }
  },
);

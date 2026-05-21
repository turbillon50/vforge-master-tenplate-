/**
 * Social links service — reads enabled links from DB, falls back to empty list.
 * Cached per request via React.cache.
 */

import { cache } from "react";
import { db } from "@/lib/db/client";
import { socialLinks } from "@/lib/db/schema/social";
import { eq } from "drizzle-orm";
import { socialPlatforms, type SocialPlatform } from "@/config/social.config";

export interface SocialLink {
  platform: SocialPlatform | string;
  url: string;
  label: string;
  icon: string;
  color: string;
}

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = await db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.enabled, true));
    return rows
      .filter((r) => r.url && r.url.length > 0)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((r) => {
        const platform = socialPlatforms[r.platform as SocialPlatform];
        return {
          platform: r.platform,
          url: r.url ?? "",
          label: r.label ?? platform?.label ?? r.platform,
          icon: platform?.icon ?? "Link",
          color: platform?.color ?? "#999",
        };
      });
  } catch (err) {
    console.error("[social-links] load failed", err);
    return [];
  }
});

/**
 * Feature flag resolver — DB overrides win, then defaults.
 * Cached per-request via React.cache + revalidated on flag mutation.
 */

import { cache } from "react";
import { db } from "@/lib/db/client";
import { featureFlags } from "@/lib/db/schema/feature-flags";
import { defaultFlagMap, FEATURE_FLAGS, type FeatureFlagKey } from "@/config/feature-flags.config";

export type FlagMap = Record<FeatureFlagKey, boolean>;

async function loadFlagsFromDb(): Promise<Partial<FlagMap>> {
  if (!process.env.DATABASE_URL) return {};
  try {
    const rows = await db.select().from(featureFlags);
    const map: Partial<FlagMap> = {};
    for (const row of rows) {
      (map as Record<string, boolean>)[row.key] = row.enabled;
    }
    return map;
  } catch (err) {
    console.error("[feature-flags] load failed", err);
    return {};
  }
}

export const getFlags = cache(async (): Promise<FlagMap> => {
  const overrides = await loadFlagsFromDb();
  return { ...defaultFlagMap, ...overrides } as FlagMap;
});

export async function isFeatureEnabled(key: FeatureFlagKey | string): Promise<boolean> {
  const flags = await getFlags();
  return Boolean((flags as Record<string, boolean>)[key]);
}

export { FEATURE_FLAGS };

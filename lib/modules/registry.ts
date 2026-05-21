/**
 * Module registry — resolves which modules are enabled (DB overrides → config defaults),
 * filters nav items by user permissions, surfaces admin pages.
 */

import { cache } from "react";
import { modulesConfig, type ModuleEntry, type ModuleId } from "@/config/modules.config";
import { moduleSettings } from "@/lib/db/schema/modules";
import { db } from "@/lib/db/client";
import type { AuthUser } from "@/lib/auth";
import type { PermissionKey } from "@/config/permissions.config";

async function loadOverrides(): Promise<Partial<Record<ModuleId, boolean>>> {
  if (!process.env.DATABASE_URL) return {};
  try {
    const rows = await db.select().from(moduleSettings);
    const map: Partial<Record<ModuleId, boolean>> = {};
    for (const row of rows) {
      map[row.moduleId as ModuleId] = row.enabled;
    }
    return map;
  } catch (err) {
    console.error("[modules] override load failed", err);
    return {};
  }
}

export const getResolvedModules = cache(async (): Promise<ModuleEntry[]> => {
  const overrides = await loadOverrides();
  return Object.values(modulesConfig).map((m) => ({
    ...m,
    enabled: overrides[m.id] ?? m.enabled,
  }));
});

export async function getEnabledModulesAsync(): Promise<ModuleEntry[]> {
  return (await getResolvedModules()).filter((m) => m.enabled);
}

export async function isModuleEnabledAsync(id: ModuleId): Promise<boolean> {
  const modules = await getResolvedModules();
  return modules.find((m) => m.id === id)?.enabled ?? false;
}

export function navItemsForUser(
  modules: ModuleEntry[],
  user: AuthUser | null,
): Array<{ id: ModuleId; href: string; label: { en: string; es: string }; icon: string }> {
  const items: Array<{ id: ModuleId; href: string; label: { en: string; es: string }; icon: string }> =
    [];
  for (const m of modules) {
    if (!m.enabled) continue;
    for (const nav of m.navItems) {
      const requiredPerms = m.permissions as PermissionKey[];
      if (requiredPerms.length > 0 && (!user || !requiredPerms.every((p) => user.permissions.includes(p)))) {
        continue;
      }
      items.push({ id: m.id, href: nav.href, label: nav.label, icon: nav.icon });
    }
  }
  return items;
}

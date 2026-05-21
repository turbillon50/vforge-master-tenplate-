/**
 * Module interface — the contract every module under /modules must implement.
 * Modules expose UI routes, nav items, admin pages, schema, and lifecycle hooks.
 */

import type { ComponentType } from "react";
import type { ModuleId, ModuleEntry } from "@/config/modules.config";
import type { PermissionKey } from "@/config/permissions.config";

export interface ModuleNavItem {
  label: { en: string; es: string };
  href: string;
  icon: string;
  permission?: PermissionKey;
}

export interface ModuleAdminPage {
  href: string;
  label: { en: string; es: string };
  icon: string;
  permission: PermissionKey;
  description?: { en: string; es: string };
}

export interface Module {
  id: ModuleId;
  meta: ModuleEntry;
  appNavItems: ModuleNavItem[];
  adminPages: ModuleAdminPage[];
  // Optional widgets injected into the user dashboard
  dashboardWidgets?: Array<{ key: string; component: ComponentType }>;
  // Permissions this module declares (in addition to permissions.config.ts)
  permissions?: PermissionKey[];
  // Optional lifecycle
  onEnable?(): Promise<void>;
  onDisable?(): Promise<void>;
}

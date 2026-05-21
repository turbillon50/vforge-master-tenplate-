/**
 * Permission helpers — server and client safe.
 * Use with `<Can permission="users.manage">` UI component
 * or `requirePermission()` inside server actions.
 */

import type { AuthUser } from "@/lib/auth";
import { rolePermissions, type Role } from "@/config/roles.config";
import type { PermissionKey } from "@/config/permissions.config";

export function hasPermission(user: AuthUser | null, permission: PermissionKey): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function hasAllPermissions(
  user: AuthUser | null,
  permissions: PermissionKey[],
): boolean {
  if (!user) return false;
  return permissions.every((p) => user.permissions.includes(p));
}

export function hasAnyPermission(
  user: AuthUser | null,
  permissions: PermissionKey[],
): boolean {
  if (!user) return false;
  return permissions.some((p) => user.permissions.includes(p));
}

export function permissionsForRole(role: Role): PermissionKey[] {
  return rolePermissions[role] ?? [];
}

export async function requirePermission(
  user: AuthUser | null,
  permission: PermissionKey,
): Promise<AuthUser> {
  if (!user) throw new Error("UNAUTHENTICATED");
  if (!hasPermission(user, permission)) {
    throw new Error(`FORBIDDEN:${permission}`);
  }
  return user;
}

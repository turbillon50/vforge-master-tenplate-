/**
 * Auth helpers — wraps Clerk and projects user → role + permissions.
 * Always use these instead of calling Clerk directly inside services/routes.
 */

import { auth as clerkAuth, currentUser } from "@clerk/nextjs/server";
import {
  DEFAULT_ROLE,
  isAdminRole,
  isStaffRole,
  rolePermissions,
  type Role,
} from "@/config/roles.config";
import type { PermissionKey } from "@/config/permissions.config";

export interface AuthUser {
  id: string;
  email: string | null;
  fullName: string | null;
  imageUrl: string | null;
  role: Role;
  permissions: PermissionKey[];
}

function readRole(user: { publicMetadata?: Record<string, unknown> } | null): Role {
  const raw = (user?.publicMetadata?.role as string | undefined) ?? DEFAULT_ROLE;
  return ((rolePermissions as Record<string, unknown>)[raw] ? raw : DEFAULT_ROLE) as Role;
}

function readExtraPermissions(
  user: { publicMetadata?: Record<string, unknown> } | null,
): PermissionKey[] {
  const extra = user?.publicMetadata?.permissions;
  return Array.isArray(extra) ? (extra as PermissionKey[]) : [];
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const user = await currentUser();
  if (!user) return null;
  const role = readRole(user);
  const basePerms = rolePermissions[role] ?? [];
  const extra = readExtraPermissions(user);
  const permissions = Array.from(new Set([...basePerms, ...extra]));
  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    fullName:
      [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || null,
    imageUrl: user.imageUrl ?? null,
    role,
    permissions,
  };
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  return user;
}

export async function requireRole(role: Role | Role[]): Promise<AuthUser> {
  const user = await requireUser();
  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(user.role)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireUser();
  if (!isAdminRole(user.role)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function requireStaff(): Promise<AuthUser> {
  const user = await requireUser();
  if (!isStaffRole(user.role)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function getAuthState(): Promise<{
  isAuthenticated: boolean;
  userId: string | null;
}> {
  const { userId } = await clerkAuth();
  return { isAuthenticated: Boolean(userId), userId };
}

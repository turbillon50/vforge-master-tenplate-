/**
 * Auth helpers — wraps Clerk and projects user → role + permissions.
 * Always use these instead of calling Clerk directly inside services/routes.
 *
 * Demo mode: when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing (e.g. on a
 * zero-config Vercel preview), every request is treated as a demo
 * super-admin so the entire UI surface remains explorable for clients.
 */

import { ALL_PERMISSIONS, type PermissionKey } from "@/config/permissions.config";
import {
  DEFAULT_ROLE,
  isAdminRole,
  isStaffRole,
  rolePermissions,
  type Role,
} from "@/config/roles.config";

export interface AuthUser {
  id: string;
  email: string | null;
  fullName: string | null;
  imageUrl: string | null;
  role: Role;
  permissions: PermissionKey[];
}

export const IS_DEMO_MODE =
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY;

const DEMO_USER: AuthUser = {
  id: "demo_admin",
  email: "demo@vforge.app",
  fullName: "Demo Admin",
  imageUrl: null,
  role: "super_admin",
  permissions: ALL_PERMISSIONS,
};

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
  if (IS_DEMO_MODE) return DEMO_USER;
  try {
    const { currentUser } = await import("@clerk/nextjs/server");
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
  } catch (err) {
    console.warn("[auth] currentUser failed, returning null", err);
    return null;
  }
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
  if (IS_DEMO_MODE) return { isAuthenticated: true, userId: DEMO_USER.id };
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    return { isAuthenticated: Boolean(userId), userId };
  } catch {
    return { isAuthenticated: false, userId: null };
  }
}

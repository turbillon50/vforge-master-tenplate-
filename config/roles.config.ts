/**
 * Role definitions — roles are permission groups.
 * Extend by adding new roles or per-user overrides in DB.
 */

import { ALL_PERMISSIONS, PERMISSIONS, type PermissionKey } from "./permissions.config";

export const ROLES = [
  "super_admin",
  "admin",
  "operator",
  "employee",
  "customer",
  "guest",
] as const;

export type Role = (typeof ROLES)[number];

export const rolePermissions: Record<Role, PermissionKey[]> = {
  super_admin: ALL_PERMISSIONS,

  admin: ALL_PERMISSIONS.filter(
    (p) =>
      p !== PERMISSIONS.USERS_IMPERSONATE &&
      p !== PERMISSIONS.ROLES_MANAGE &&
      p !== PERMISSIONS.FEATURE_FLAGS_MANAGE,
  ),

  operator: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.FAQ_VIEW,
    PERMISSIONS.FAQ_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.SUPPORT_VIEW,
    PERMISSIONS.SUPPORT_REPLY,
    PERMISSIONS.NOTIFICATIONS_VIEW,
    PERMISSIONS.NOTIFICATIONS_SEND,
    PERMISSIONS.RECORDS_VIEW,
    PERMISSIONS.RECORDS_CREATE,
    PERMISSIONS.RECORDS_EDIT,
    PERMISSIONS.ANALYTICS_VIEW,
  ],

  employee: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.RECORDS_VIEW,
    PERMISSIONS.RECORDS_CREATE,
    PERMISSIONS.RECORDS_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.SUPPORT_VIEW,
  ],

  customer: [],

  guest: [],
};

export const roleLabels: Record<Role, { en: string; es: string }> = {
  super_admin: { en: "Super Admin", es: "Super Admin" },
  admin: { en: "Admin", es: "Administrador" },
  operator: { en: "Operator", es: "Operador" },
  employee: { en: "Employee", es: "Empleado" },
  customer: { en: "Customer", es: "Cliente" },
  guest: { en: "Guest", es: "Invitado" },
};

export const DEFAULT_ROLE: Role = "customer";

export function isAdminRole(role: Role | null | undefined): boolean {
  return role === "admin" || role === "super_admin";
}

export function isStaffRole(role: Role | null | undefined): boolean {
  return role === "admin" || role === "super_admin" || role === "operator" || role === "employee";
}

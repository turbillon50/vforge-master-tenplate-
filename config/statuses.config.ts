/**
 * Universal status system — standardized statuses reusable across modules.
 * Avoid hardcoded statuses inside modules. Use `<StatusBadge status="pending" />`.
 * Admin can override colors/labels via DB `statuses` table.
 */

export const STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ACTIVE: "active",
  INACTIVE: "inactive",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
  PROCESSING: "processing",
  FAILED: "failed",
  EXPIRED: "expired",
  PAID: "paid",
  UNPAID: "unpaid",
  SCHEDULED: "scheduled",
} as const;

export type StatusKey = (typeof STATUSES)[keyof typeof STATUSES];

export interface StatusDefinition {
  key: StatusKey;
  label: { en: string; es: string };
  color: "amber" | "emerald" | "violet" | "cyan" | "crimson" | "neutral" | "blue";
  icon: string;
  allowedTransitions: StatusKey[];
}

export const statusDefinitions: Record<StatusKey, StatusDefinition> = {
  pending: {
    key: STATUSES.PENDING,
    label: { en: "Pending", es: "Pendiente" },
    color: "amber",
    icon: "Clock",
    allowedTransitions: ["approved", "rejected", "cancelled"],
  },
  approved: {
    key: STATUSES.APPROVED,
    label: { en: "Approved", es: "Aprobado" },
    color: "emerald",
    icon: "CheckCircle2",
    allowedTransitions: ["active", "completed", "cancelled"],
  },
  rejected: {
    key: STATUSES.REJECTED,
    label: { en: "Rejected", es: "Rechazado" },
    color: "crimson",
    icon: "XCircle",
    allowedTransitions: ["archived"],
  },
  active: {
    key: STATUSES.ACTIVE,
    label: { en: "Active", es: "Activo" },
    color: "emerald",
    icon: "Activity",
    allowedTransitions: ["inactive", "completed", "cancelled", "expired"],
  },
  inactive: {
    key: STATUSES.INACTIVE,
    label: { en: "Inactive", es: "Inactivo" },
    color: "neutral",
    icon: "PauseCircle",
    allowedTransitions: ["active", "archived"],
  },
  completed: {
    key: STATUSES.COMPLETED,
    label: { en: "Completed", es: "Completado" },
    color: "emerald",
    icon: "CheckCheck",
    allowedTransitions: ["archived", "refunded"],
  },
  cancelled: {
    key: STATUSES.CANCELLED,
    label: { en: "Cancelled", es: "Cancelado" },
    color: "neutral",
    icon: "X",
    allowedTransitions: ["archived"],
  },
  refunded: {
    key: STATUSES.REFUNDED,
    label: { en: "Refunded", es: "Reembolsado" },
    color: "violet",
    icon: "Undo2",
    allowedTransitions: ["archived"],
  },
  draft: {
    key: STATUSES.DRAFT,
    label: { en: "Draft", es: "Borrador" },
    color: "neutral",
    icon: "FileEdit",
    allowedTransitions: ["published", "archived"],
  },
  published: {
    key: STATUSES.PUBLISHED,
    label: { en: "Published", es: "Publicado" },
    color: "cyan",
    icon: "Globe",
    allowedTransitions: ["archived", "draft"],
  },
  archived: {
    key: STATUSES.ARCHIVED,
    label: { en: "Archived", es: "Archivado" },
    color: "neutral",
    icon: "Archive",
    allowedTransitions: [],
  },
  processing: {
    key: STATUSES.PROCESSING,
    label: { en: "Processing", es: "Procesando" },
    color: "blue",
    icon: "Loader2",
    allowedTransitions: ["completed", "failed", "cancelled"],
  },
  failed: {
    key: STATUSES.FAILED,
    label: { en: "Failed", es: "Fallido" },
    color: "crimson",
    icon: "AlertTriangle",
    allowedTransitions: ["pending", "archived"],
  },
  expired: {
    key: STATUSES.EXPIRED,
    label: { en: "Expired", es: "Expirado" },
    color: "neutral",
    icon: "CalendarOff",
    allowedTransitions: ["archived"],
  },
  paid: {
    key: STATUSES.PAID,
    label: { en: "Paid", es: "Pagado" },
    color: "emerald",
    icon: "BadgeCheck",
    allowedTransitions: ["refunded", "archived"],
  },
  unpaid: {
    key: STATUSES.UNPAID,
    label: { en: "Unpaid", es: "Sin pagar" },
    color: "amber",
    icon: "AlertCircle",
    allowedTransitions: ["paid", "cancelled"],
  },
  scheduled: {
    key: STATUSES.SCHEDULED,
    label: { en: "Scheduled", es: "Programado" },
    color: "violet",
    icon: "CalendarClock",
    allowedTransitions: ["active", "cancelled"],
  },
};

export function canTransition(from: StatusKey, to: StatusKey): boolean {
  return statusDefinitions[from]?.allowedTransitions.includes(to) ?? false;
}

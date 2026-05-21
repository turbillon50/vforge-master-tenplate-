/**
 * Status helpers — read DB overrides or fall back to config defaults.
 */

import { statusDefinitions, type StatusKey } from "@/config/statuses.config";

export function getStatusLabel(key: StatusKey, locale: "en" | "es"): string {
  return statusDefinitions[key]?.label[locale] ?? key;
}

export function getStatusColor(key: StatusKey): string {
  return statusDefinitions[key]?.color ?? "neutral";
}

export function getStatusIcon(key: StatusKey): string {
  return statusDefinitions[key]?.icon ?? "Circle";
}

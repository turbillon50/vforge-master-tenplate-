/**
 * Industry template registry. Each industry pre-wires roles, modules, dashboard
 * sections, communication/payment/notification flows, recommended UI archetype
 * and required integrations. Forked apps activate one industry at a time via
 * `app_settings.industry` or env `NEXT_PUBLIC_INDUSTRY`.
 *
 * See `industry-templates/<id>/config.ts` for full definitions.
 */

import { restaurantTemplate } from "@/industry-templates/restaurant/config";
import { realEstateTemplate } from "@/industry-templates/real-estate/config";
import { businessNetworkTemplate } from "@/industry-templates/business-network/config";
import { schoolTemplate } from "@/industry-templates/school/config";
import { securityInspectionsTemplate } from "@/industry-templates/security-inspections/config";
import type { ModuleId } from "@/config/modules.config";
import type { UIArchetype } from "@/config/ui-mode.config";
import type { IntegrationId } from "@/config/integrations.config";

export type IndustryId =
  | "restaurant"
  | "real-estate"
  | "business-network"
  | "school"
  | "security-inspections"
  | "generic";

export interface IndustryRole {
  key: string;
  label: { en: string; es: string };
  description: { en: string; es: string };
}

export interface IndustryFlow {
  id: string;
  label: { en: string; es: string };
  steps: string[];
}

export interface IndustryDataModel {
  name: string;
  fields: Array<{ name: string; type: string; required?: boolean }>;
}

export interface IndustryTemplate {
  id: IndustryId;
  name: { en: string; es: string };
  tagline: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
  recommendedArchetype: UIArchetype;
  modules: ModuleId[];
  roles: IndustryRole[];
  dashboardSections: Array<{
    key: string;
    label: { en: string; es: string };
    href: string;
    icon: string;
  }>;
  adminSections: Array<{
    key: string;
    label: { en: string; es: string };
    href: string;
    icon: string;
  }>;
  dataModels: IndustryDataModel[];
  communicationFlows: IndustryFlow[];
  paymentFlows: IndustryFlow[];
  notificationFlows: IndustryFlow[];
  requiredIntegrations: IntegrationId[];
  optionalIntegrations: IntegrationId[];
}

export const industryTemplates: Record<Exclude<IndustryId, "generic">, IndustryTemplate> = {
  restaurant: restaurantTemplate,
  "real-estate": realEstateTemplate,
  "business-network": businessNetworkTemplate,
  school: schoolTemplate,
  "security-inspections": securityInspectionsTemplate,
};

export const INDUSTRY_LIST = Object.values(industryTemplates);

export function getIndustry(id: IndustryId): IndustryTemplate | null {
  if (id === "generic") return null;
  return industryTemplates[id] ?? null;
}

export const DEFAULT_INDUSTRY: IndustryId =
  (process.env.NEXT_PUBLIC_INDUSTRY as IndustryId | undefined) ?? "generic";

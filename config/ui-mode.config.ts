/**
 * UI Archetype System — visually transforms the app into different interface
 * experiences without changing core logic. Switch via `data-archetype="X"` on
 * <html>, persisted in cookie `vforge-archetype` + DB `app_settings.ui_archetype`.
 *
 * Backend, modules, users, permissions and data remain identical across modes.
 * Only layout, density, navigation, animation and visual presentation change.
 */

export const UI_ARCHETYPES = {
  FINTECH: "fintech",
  CINEMATIC: "cinematic",
  OPERATIONS: "operations",
  PRODUCTIVITY: "productivity",
  MARKETPLACE: "marketplace",
  MESSAGING: "messaging",
} as const;

export type UIArchetype = (typeof UI_ARCHETYPES)[keyof typeof UI_ARCHETYPES];

export interface UIArchetypeDefinition {
  key: UIArchetype;
  label: { en: string; es: string };
  inspiredBy: string[];
  description: { en: string; es: string };
  density: "compact" | "comfortable" | "spacious";
  navStyle: "sidebar" | "topbar" | "bottom-sheet" | "rail";
  cardStyle: "compact" | "immersive" | "operational" | "structured" | "social";
  animation: "subtle" | "cinematic" | "snappy" | "calm";
  typography: "operational" | "editorial" | "expressive" | "neutral";
  mobile: "one-hand" | "showcase" | "operational" | "workspace" | "chat";
  bestFor: string[];
  /**
   * CSS token overrides applied when [data-archetype="<key>"] is on <html>.
   * Keys must match CSS variable names declared in `app/globals.css`.
   */
  tokens: Record<string, string>;
}

export const uiModes: Record<UIArchetype, UIArchetypeDefinition> = {
  fintech: {
    key: "fintech",
    label: { en: "Fintech", es: "Fintech" },
    inspiredBy: ["Mercado Pago", "Stripe", "Revolut"],
    description: {
      en: "Compact cards, KPI dashboards, sidebar navigation. Best for fintech, SaaS, CRM, admin.",
      es: "Tarjetas compactas, dashboards KPI, navegación lateral. Ideal para fintech, SaaS, CRM, admin.",
    },
    density: "compact",
    navStyle: "sidebar",
    cardStyle: "compact",
    animation: "subtle",
    typography: "operational",
    mobile: "one-hand",
    bestFor: ["fintech", "saas", "crm", "admin", "analytics"],
    tokens: {
      "--radius-lg": "10px",
      "--radius-md": "8px",
      "--radius-sm": "5px",
      "--archetype-card-padding": "1rem",
      "--archetype-section-padding-y": "2rem",
      "--archetype-gap": "0.75rem",
      "--archetype-hero-height": "auto",
      "--archetype-headline-scale": "0.95",
    },
  },
  cinematic: {
    key: "cinematic",
    label: { en: "Cinematic", es: "Cinemático" },
    inspiredBy: ["Apple TV", "Netflix", "Airbnb Luxury"],
    description: {
      en: "Large heroes, immersive cards, generous spacing, luxury feeling. Best for tourism, luxury, real estate.",
      es: "Heroes grandes, tarjetas inmersivas, espaciado generoso, sensación lujo. Ideal para turismo, lujo, real estate.",
    },
    density: "spacious",
    navStyle: "topbar",
    cardStyle: "immersive",
    animation: "cinematic",
    typography: "editorial",
    mobile: "showcase",
    bestFor: ["tourism", "luxury", "real-estate", "experiences", "premium-marketplace"],
    tokens: {
      "--radius-lg": "20px",
      "--radius-md": "14px",
      "--radius-sm": "8px",
      "--archetype-card-padding": "2rem",
      "--archetype-section-padding-y": "5rem",
      "--archetype-gap": "1.75rem",
      "--archetype-hero-height": "85vh",
      "--archetype-headline-scale": "1.2",
    },
  },
  operations: {
    key: "operations",
    label: { en: "Operations", es: "Operaciones" },
    inspiredBy: ["Uber", "Logistics dispatch", "Delivery apps"],
    description: {
      en: "Map-first layouts, bottom sheets, live status. Best for logistics, delivery, rides, field ops.",
      es: "Layouts con mapa, bottom sheets, estados en vivo. Ideal para logística, delivery, rides, ops de campo.",
    },
    density: "comfortable",
    navStyle: "bottom-sheet",
    cardStyle: "operational",
    animation: "snappy",
    typography: "operational",
    mobile: "operational",
    bestFor: ["logistics", "delivery", "rides", "construction", "field-ops"],
    tokens: {
      "--radius-lg": "16px",
      "--radius-md": "12px",
      "--radius-sm": "8px",
      "--archetype-card-padding": "1.25rem",
      "--archetype-section-padding-y": "1.5rem",
      "--archetype-gap": "1rem",
      "--archetype-hero-height": "auto",
      "--archetype-headline-scale": "1",
    },
  },
  productivity: {
    key: "productivity",
    label: { en: "Productivity", es: "Productividad" },
    inspiredBy: ["Notion", "Linear", "Slack"],
    description: {
      en: "Sidebar workspaces, structured hierarchy, tables, kanban. Best for schools, CRMs, enterprise tools.",
      es: "Workspaces con sidebar, jerarquía estructurada, tablas, kanban. Ideal para escuelas, CRMs, herramientas enterprise.",
    },
    density: "compact",
    navStyle: "rail",
    cardStyle: "structured",
    animation: "calm",
    typography: "neutral",
    mobile: "workspace",
    bestFor: ["schools", "operations", "crm", "management", "enterprise-tools"],
    tokens: {
      "--radius-lg": "8px",
      "--radius-md": "6px",
      "--radius-sm": "4px",
      "--archetype-card-padding": "0.875rem",
      "--archetype-section-padding-y": "1.5rem",
      "--archetype-gap": "0.5rem",
      "--archetype-hero-height": "auto",
      "--archetype-headline-scale": "0.9",
    },
  },
  marketplace: {
    key: "marketplace",
    label: { en: "Marketplace", es: "Marketplace" },
    inspiredBy: ["Mercado Libre", "Etsy", "Airbnb"],
    description: {
      en: "Grid-first layouts, social cards, promotional rails, fast filters. Best for directories, marketplaces, restaurant ordering, business networks.",
      es: "Layouts en grid, tarjetas sociales, rieles promocionales, filtros rápidos. Ideal para directorios, marketplaces, pedidos de restaurante, redes de negocios.",
    },
    density: "comfortable",
    navStyle: "topbar",
    cardStyle: "social",
    animation: "snappy",
    typography: "expressive",
    mobile: "showcase",
    bestFor: ["marketplace", "restaurant", "business-network", "directory", "ecommerce"],
    tokens: {
      "--radius-lg": "16px",
      "--radius-md": "12px",
      "--radius-sm": "8px",
      "--archetype-card-padding": "1rem",
      "--archetype-section-padding-y": "2.5rem",
      "--archetype-gap": "1rem",
      "--archetype-hero-height": "auto",
      "--archetype-headline-scale": "1.05",
    },
  },
  messaging: {
    key: "messaging",
    label: { en: "Messaging", es: "Mensajería" },
    inspiredBy: ["WhatsApp", "iMessage", "Telegram"],
    description: {
      en: "Conversation-first layout: list of threads, sticky composer, read receipts, lightweight cards. Best for school chats, business networks, community apps.",
      es: "Layout conversación-primero: lista de hilos, composer fijo, recibos de lectura, tarjetas ligeras. Ideal para chats escolares, redes de negocios, comunidades.",
    },
    density: "comfortable",
    navStyle: "bottom-sheet",
    cardStyle: "social",
    animation: "snappy",
    typography: "neutral",
    mobile: "chat",
    bestFor: ["school", "business-network", "community", "support", "internal-comms"],
    tokens: {
      "--radius-lg": "18px",
      "--radius-md": "14px",
      "--radius-sm": "10px",
      "--archetype-card-padding": "0.875rem",
      "--archetype-section-padding-y": "1rem",
      "--archetype-gap": "0.625rem",
      "--archetype-hero-height": "auto",
      "--archetype-headline-scale": "0.95",
    },
  },
};

export const DEFAULT_ARCHETYPE: UIArchetype = "fintech";

export const ARCHETYPE_LIST = Object.values(uiModes);

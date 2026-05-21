/**
 * Module registry — declarative list of modules available to mount.
 * Each module owns its own routes, nav items, admin pages, schema.
 * Toggle `enabled` to turn modules on/off without rewriting code.
 * Per-app overrides persist in DB `module_settings`.
 */

export type ModuleId =
  | "ecommerce"
  | "booking"
  | "marketplace"
  | "rides"
  | "crm"
  | "analytics"
  | "payments"
  | "notifications"
  | "communication"
  | "ai"
  | "wallet"
  | "subscriptions"
  | "dynamic-content"
  | "user-operations"
  | "api-center";

export type ModuleCategory = "core" | "industry" | "growth" | "ai";

export interface ModuleEntry {
  id: ModuleId;
  enabled: boolean;
  category: ModuleCategory;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
  routes: string[];
  navItems: Array<{
    label: { en: string; es: string };
    href: string;
    icon: string;
  }>;
  permissions: string[];
}

export const modulesConfig: Record<ModuleId, ModuleEntry> = {
  ecommerce: {
    id: "ecommerce",
    enabled: true,
    category: "industry",
    name: { en: "E-commerce", es: "E-commerce" },
    description: {
      en: "Products, cart, checkout and orders.",
      es: "Productos, carrito, checkout y pedidos.",
    },
    icon: "ShoppingBag",
    routes: ["/app/ecommerce"],
    navItems: [
      {
        label: { en: "Shop", es: "Tienda" },
        href: "/app/ecommerce",
        icon: "ShoppingBag",
      },
    ],
    permissions: ["records.view"],
  },
  booking: {
    id: "booking",
    enabled: true,
    category: "industry",
    name: { en: "Booking", es: "Reservas" },
    description: {
      en: "Calendar, slots and reservations.",
      es: "Calendario, slots y reservas.",
    },
    icon: "CalendarCheck",
    routes: ["/app/booking"],
    navItems: [
      {
        label: { en: "Booking", es: "Reservas" },
        href: "/app/booking",
        icon: "CalendarCheck",
      },
    ],
    permissions: ["records.view"],
  },
  marketplace: {
    id: "marketplace",
    enabled: true,
    category: "industry",
    name: { en: "Marketplace", es: "Marketplace" },
    description: {
      en: "Multi-vendor listings and orders.",
      es: "Vendors, listings y pedidos multi-vendedor.",
    },
    icon: "Store",
    routes: ["/app/marketplace"],
    navItems: [
      {
        label: { en: "Marketplace", es: "Marketplace" },
        href: "/app/marketplace",
        icon: "Store",
      },
    ],
    permissions: ["records.view"],
  },
  rides: {
    id: "rides",
    enabled: true,
    category: "industry",
    name: { en: "Rides", es: "Viajes" },
    description: {
      en: "Uber-style trips with drivers and routing.",
      es: "Viajes estilo Uber con conductores y ruteo.",
    },
    icon: "Car",
    routes: ["/app/rides"],
    navItems: [
      {
        label: { en: "Rides", es: "Viajes" },
        href: "/app/rides",
        icon: "Car",
      },
    ],
    permissions: ["records.view"],
  },
  crm: {
    id: "crm",
    enabled: true,
    category: "growth",
    name: { en: "CRM", es: "CRM" },
    description: {
      en: "Contacts, deals and pipelines.",
      es: "Contactos, oportunidades y pipelines.",
    },
    icon: "Users",
    routes: ["/app/crm"],
    navItems: [
      {
        label: { en: "CRM", es: "CRM" },
        href: "/app/crm",
        icon: "Users",
      },
    ],
    permissions: ["records.view"],
  },
  analytics: {
    id: "analytics",
    enabled: true,
    category: "core",
    name: { en: "Analytics", es: "Analítica" },
    description: {
      en: "Dashboards and KPIs.",
      es: "Dashboards y KPIs.",
    },
    icon: "BarChart3",
    routes: ["/app/analytics"],
    navItems: [
      {
        label: { en: "Analytics", es: "Analítica" },
        href: "/app/analytics",
        icon: "BarChart3",
      },
    ],
    permissions: ["analytics.view"],
  },
  payments: {
    id: "payments",
    enabled: true,
    category: "core",
    name: { en: "Payments", es: "Pagos" },
    description: {
      en: "Stripe + Mercado Pago unified payment flows.",
      es: "Flujos de pago unificados con Stripe + Mercado Pago.",
    },
    icon: "CreditCard",
    routes: ["/app/payments"],
    navItems: [
      {
        label: { en: "Payments", es: "Pagos" },
        href: "/app/payments",
        icon: "CreditCard",
      },
    ],
    permissions: ["payments.view"],
  },
  notifications: {
    id: "notifications",
    enabled: true,
    category: "core",
    name: { en: "Notifications", es: "Notificaciones" },
    description: {
      en: "Low-level notification delivery (email, SMS, WhatsApp, push).",
      es: "Entrega de notificaciones de bajo nivel (email, SMS, WhatsApp, push).",
    },
    icon: "Bell",
    routes: [],
    navItems: [],
    permissions: ["notifications.view"],
  },
  communication: {
    id: "communication",
    enabled: true,
    category: "core",
    name: { en: "Communication Center", es: "Centro de Comunicación" },
    description: {
      en: "Universal multi-channel inbox: in-app, email, WhatsApp, SMS, push. Announcements, conversations, templates, automations, read receipts.",
      es: "Bandeja multi-canal universal: in-app, email, WhatsApp, SMS, push. Anuncios, conversaciones, plantillas, automatizaciones, recibos de lectura.",
    },
    icon: "MessagesSquare",
    routes: ["/app/inbox", "/app/inbox/conversations", "/app/inbox/announcements"],
    navItems: [
      {
        label: { en: "Inbox", es: "Bandeja" },
        href: "/app/inbox",
        icon: "MessagesSquare",
      },
    ],
    permissions: ["notifications.view"],
  },
  ai: {
    id: "ai",
    enabled: true,
    category: "ai",
    name: { en: "AI Copilot", es: "AI Copilot" },
    description: {
      en: "OpenRouter chat, prompts library and assistants.",
      es: "Chat OpenRouter, librería de prompts y asistentes.",
    },
    icon: "Sparkles",
    routes: ["/app/ai"],
    navItems: [
      {
        label: { en: "Copilot", es: "Copilot" },
        href: "/app/ai",
        icon: "Sparkles",
      },
    ],
    permissions: [],
  },
  wallet: {
    id: "wallet",
    enabled: true,
    category: "growth",
    name: { en: "Wallet", es: "Billetera" },
    description: {
      en: "Balances, transactions and payouts.",
      es: "Saldos, transacciones y payouts.",
    },
    icon: "Wallet",
    routes: ["/app/wallet"],
    navItems: [
      {
        label: { en: "Wallet", es: "Billetera" },
        href: "/app/wallet",
        icon: "Wallet",
      },
    ],
    permissions: [],
  },
  subscriptions: {
    id: "subscriptions",
    enabled: true,
    category: "growth",
    name: { en: "Subscriptions", es: "Suscripciones" },
    description: {
      en: "Plans, recurring billing and upgrades.",
      es: "Planes, billing recurrente y upgrades.",
    },
    icon: "Repeat",
    routes: ["/app/subscriptions"],
    navItems: [
      {
        label: { en: "Plans", es: "Planes" },
        href: "/app/subscriptions",
        icon: "Repeat",
      },
    ],
    permissions: [],
  },
  "user-operations": {
    id: "user-operations",
    enabled: true,
    category: "core",
    name: { en: "User Operations", es: "Operaciones de Usuario" },
    description: {
      en: "Extended user profiles, preferences, activity history and operational records.",
      es: "Perfiles extendidos, preferencias, historial de actividad y registros operacionales.",
    },
    icon: "UserCog",
    routes: ["/app/profile", "/app/profile/activity", "/app/profile/preferences"],
    navItems: [
      {
        label: { en: "Profile", es: "Perfil" },
        href: "/app/profile",
        icon: "UserCog",
      },
    ],
    permissions: [],
  },
  "api-center": {
    id: "api-center",
    enabled: true,
    category: "core",
    name: { en: "API Center", es: "Centro API" },
    description: {
      en: "API keys, prepaid credits, metered AI/API usage, internal billing and resale.",
      es: "API keys, créditos prepago, uso medido de AI/API, billing interno y reventa.",
    },
    icon: "KeyRound",
    routes: [
      "/app/api",
      "/app/api/keys",
      "/app/api/usage",
      "/app/api/credits",
      "/app/api/docs",
    ],
    navItems: [
      {
        label: { en: "API", es: "API" },
        href: "/app/api",
        icon: "KeyRound",
      },
    ],
    permissions: [],
  },
  "dynamic-content": {
    id: "dynamic-content",
    enabled: true,
    category: "core",
    name: { en: "Dynamic Content", es: "Contenido Dinámico" },
    description: {
      en: "Editable content blocks across the app.",
      es: "Bloques de contenido editables en toda la app.",
    },
    icon: "LayoutTemplate",
    routes: [],
    navItems: [],
    permissions: ["content.view"],
  },
};

export function getEnabledModules(): ModuleEntry[] {
  return Object.values(modulesConfig).filter((m) => m.enabled);
}

export function isModuleEnabled(id: ModuleId): boolean {
  return modulesConfig[id]?.enabled ?? false;
}

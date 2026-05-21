/**
 * Global application configuration — Vº Momentum.
 * Edit this file (or override via DB `app_settings`) to brand and configure
 * the site.
 */

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Vº Momentum",
  shortName: "Momentum",
  description:
    "Desarrollamos apps, sistemas y herramientas digitales que te ayudan a vender, operar y escalar tu negocio con tecnología. Sin tensiones.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://vmomentum.site",
  env: (process.env.NEXT_PUBLIC_APP_ENV ?? "production") as
    | "development"
    | "staging"
    | "production",
  version: "0.2.0",

  // Defaults
  defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "es") as "en" | "es",
  defaultTheme: (process.env.NEXT_PUBLIC_DEFAULT_THEME ?? "dark") as "light" | "dark" | "system",
  supportedLocales: ["en", "es"] as const,

  // Company / legal
  company: {
    name: "Vº Momentum",
    legalName: "Vº Momentum · SaaS · Technology · Apps · Design",
    supportEmail:
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "Firstcontact@allglobalholding.com",
    whatsapp: "+529984292748",
    whatsappDisplay: "+52 998 429 2748",
    address: "Cancún, Quintana Roo · México",
    country: "MX",
    foundedYear: 2024,
  },

  // PWA
  pwa: {
    backgroundColor: "#000000",
    themeColor: "#0a0f1a",
    display: "standalone" as const,
    orientation: "portrait" as const,
    startUrl: "/app",
    scope: "/",
  },

  // Pricing — Momentum 4-stage methodology
  pricing: {
    currency: "MXN" as const,
    total: 12000,
    leadTimeDays: { min: 2, max: 10 },
    stages: [
      { id: "demo", label: { en: "Free demo", es: "Demo gratis" }, amount: 0, hint: { en: "24 hours", es: "24 horas" } },
      { id: "kickoff", label: { en: "Kick-off", es: "Kick off" }, amount: 4000, hint: { en: "Project starts", es: "Arranque del proyecto" } },
      { id: "integrations", label: { en: "Full integrations", es: "Integraciones completas" }, amount: 4000, hint: { en: "Everything wired", es: "Todo conectado" } },
      { id: "polish", label: { en: "Tuning & testers", es: "Afinación y testers" }, amount: 4000, hint: { en: "Final delivery", es: "Entrega final" } },
    ],
    addons: [
      { id: "ios", name: "App Store (iOS)", amount: 5000, currency: "MXN" },
      { id: "android", name: "Google Play (Android)", amount: 3000, currency: "MXN" },
    ],
  },
} as const;

export type AppConfig = typeof appConfig;

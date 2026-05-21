/**
 * Branding configuration — Vº Momentum.
 * Override at runtime via DB `app_settings.branding` (Admin → Branding).
 */

export const brandingConfig = {
  logo: {
    /**
     * Primary brand mark — chrome "V" with electric-blue "0" ring.
     * Drop your high-res PNG into /public/brand/momentum-logo.png
     * The SVG fallback (momentum-logo.svg) is a stylized recreation.
     */
    primary: "/brand/momentum-logo.png",
    primaryFallback: "/brand/momentum-logo.svg",
    icon: "/brand/momentum-mark.svg",
    favicon: "/favicon.ico",
  },
  tagline: "SaaS · Technology · Apps · Design",
  slogan: {
    en: "Your app. Your business. No friction.",
    es: "Tu app. Tu negocio. Sin tensiones.",
  },
  palette: {
    accent: "electric" as const, // electric blue glow
    chrome: true, // metallic chrome mark
  },
  typography: {
    headingFont: "Geist Sans",
    bodyFont: "Geist Sans",
    monoFont: "Geist Mono",
  },
  trustSignals: [
    {
      en: { title: "No surprises, no tensions.", subtitle: "Full transparency." },
      es: { title: "Sin sorpresas, sin tensiones.", subtitle: "Transparencia total." },
      icon: "ShieldCheck",
    },
    {
      en: { title: "Real partnership", subtitle: "from day one." },
      es: { title: "Acompañamiento real", subtitle: "desde el primer día." },
      icon: "Users",
    },
    {
      en: { title: "Post-launch support", subtitle: "always included." },
      es: { title: "Soporte post-venta", subtitle: "siempre incluido." },
      icon: "Headset",
    },
    {
      en: { title: "Continuous upgrades", subtitle: "and improvements." },
      es: { title: "Mejoras y actualizaciones", subtitle: "continuas." },
      icon: "RefreshCw",
    },
  ],
  social: {
    twitter: "@vmomentum",
    github: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export type BrandingConfig = typeof brandingConfig;

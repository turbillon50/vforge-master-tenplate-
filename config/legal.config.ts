/**
 * Legal pages catalog — declares which legal slugs are managed in DB.
 * Admin → Legal Pages Manager edits content for these slugs.
 */

export type LegalSlug =
  | "terms"
  | "privacy"
  | "cookies"
  | "delete-account"
  | "ios-policy"
  | "android-policy"
  | "support";

export interface LegalPageEntry {
  slug: LegalSlug;
  label: { en: string; es: string };
  description: { en: string; es: string };
  href: string;
  requiresVersionTracking: boolean;
}

export const legalPages: Record<LegalSlug, LegalPageEntry> = {
  terms: {
    slug: "terms",
    label: { en: "Terms and Conditions", es: "Términos y Condiciones" },
    description: {
      en: "Agreement governing use of the service.",
      es: "Acuerdo que rige el uso del servicio.",
    },
    href: "/terms",
    requiresVersionTracking: true,
  },
  privacy: {
    slug: "privacy",
    label: { en: "Privacy Policy", es: "Política de Privacidad" },
    description: {
      en: "How user data is collected, used and protected.",
      es: "Cómo se recopilan, usan y protegen los datos del usuario.",
    },
    href: "/privacy",
    requiresVersionTracking: true,
  },
  cookies: {
    slug: "cookies",
    label: { en: "Cookie Policy", es: "Política de Cookies" },
    description: {
      en: "How cookies and similar technologies are used.",
      es: "Cómo se usan cookies y tecnologías similares.",
    },
    href: "/cookies",
    requiresVersionTracking: true,
  },
  "delete-account": {
    slug: "delete-account",
    label: { en: "Account Deletion", es: "Borrado de Cuenta" },
    description: {
      en: "How to request account and data deletion.",
      es: "Cómo solicitar borrado de cuenta y datos.",
    },
    href: "/delete-account",
    requiresVersionTracking: false,
  },
  "ios-policy": {
    slug: "ios-policy",
    label: { en: "iOS App Store Policy", es: "Política de App Store" },
    description: {
      en: "App Store compliance and disclosure.",
      es: "Cumplimiento y divulgaciones App Store.",
    },
    href: "/ios-policy",
    requiresVersionTracking: false,
  },
  "android-policy": {
    slug: "android-policy",
    label: { en: "Android Play Store Policy", es: "Política de Play Store" },
    description: {
      en: "Play Store compliance and disclosure.",
      es: "Cumplimiento y divulgaciones Play Store.",
    },
    href: "/android-policy",
    requiresVersionTracking: false,
  },
  support: {
    slug: "support",
    label: { en: "Support Center", es: "Centro de Soporte" },
    description: {
      en: "Get help and contact support.",
      es: "Obtén ayuda y contacta a soporte.",
    },
    href: "/support",
    requiresVersionTracking: false,
  },
};

export const LEGAL_SLUGS = Object.keys(legalPages) as LegalSlug[];

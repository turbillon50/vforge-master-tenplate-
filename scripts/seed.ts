/**
 * Seed FAQs, legal pages, statuses and social platforms.
 * Idempotent: re-running is safe.
 */

/// Note: run via `pnpm db:seed`. Use `tsx --env-file=.env.local scripts/seed.ts` to inject envs.

import { db } from "../lib/db/client";
import { faqCategories, faqItems } from "../lib/db/schema/faq";
import { legalPages } from "../lib/db/schema/legal";
import { socialLinks } from "../lib/db/schema/social";
import { defaultLegalContent } from "../config/legal-defaults";
import { socialPlatforms } from "../config/social.config";

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 12)}`;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL not set. Skipping seed.");
    process.exit(0);
  }

  console.log("Seeding FAQ categories...");
  const categories = [
    { slug: "public", nameEn: "General", nameEs: "General", sortOrder: 0 },
    { slug: "app", nameEn: "Using the app", nameEs: "Uso de la app", sortOrder: 1 },
    { slug: "payments", nameEn: "Payments", nameEs: "Pagos", sortOrder: 2 },
    { slug: "account", nameEn: "Account", nameEs: "Cuenta", sortOrder: 3 },
    { slug: "privacy", nameEn: "Privacy", nameEs: "Privacidad", sortOrder: 4 },
  ];
  const catMap = new Map<string, string>();
  for (const c of categories) {
    const id = uid("cat");
    await db.insert(faqCategories).values({ id, ...c }).onConflictDoNothing({
      target: faqCategories.slug,
    });
    catMap.set(c.slug, id);
  }

  console.log("Seeding FAQ items...");
  const faqs = [
    {
      cat: "public",
      qEn: "What is VForge?",
      qEs: "¿Qué es VForge?",
      aEn: "A universal PWA application factory.",
      aEs: "Una fábrica universal de aplicaciones PWA.",
    },
    {
      cat: "app",
      qEn: "Does it install as a PWA?",
      qEs: "¿Se instala como PWA?",
      aEn: "Yes, from the browser menu or our install prompt.",
      aEs: "Sí, desde el menú del navegador o nuestro prompt de instalación.",
    },
    {
      cat: "payments",
      qEn: "Which providers are supported?",
      qEs: "¿Qué proveedores soportan?",
      aEn: "Stripe and Mercado Pago by default.",
      aEs: "Stripe y Mercado Pago por defecto.",
    },
    {
      cat: "account",
      qEn: "How do I delete my account?",
      qEs: "¿Cómo borro mi cuenta?",
      aEn: "Submit a request at /delete-account.",
      aEs: "Envía la solicitud en /delete-account.",
    },
    {
      cat: "privacy",
      qEn: "Where is data stored?",
      qEs: "¿Dónde se almacenan los datos?",
      aEn: "On Neon Postgres in the region you configure.",
      aEs: "En Neon Postgres en la región que configures.",
    },
  ];
  for (const [i, f] of faqs.entries()) {
    const id = uid("faq");
    await db
      .insert(faqItems)
      .values({
        id,
        categoryId: catMap.get(f.cat)!,
        questionEn: f.qEn,
        questionEs: f.qEs,
        answerEn: f.aEn,
        answerEs: f.aEs,
        sortOrder: i,
        published: true,
      })
      .onConflictDoNothing();
  }

  console.log("Seeding legal pages...");
  for (const page of Object.values(defaultLegalContent)) {
    await db
      .insert(legalPages)
      .values({
        slug: page.slug,
        titleEn: page.titleEn,
        titleEs: page.titleEs,
        bodyEn: page.bodyEn,
        bodyEs: page.bodyEs,
        version: page.version,
      })
      .onConflictDoNothing();
  }

  console.log("Seeding social platforms...");
  let order = 0;
  for (const p of Object.values(socialPlatforms)) {
    await db
      .insert(socialLinks)
      .values({
        platform: p.id,
        url: null,
        label: p.label,
        enabled: false,
        sortOrder: order++,
      })
      .onConflictDoNothing({ target: socialLinks.platform });
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

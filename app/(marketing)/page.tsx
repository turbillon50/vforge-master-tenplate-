import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Layers, Smartphone, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function LandingPage() {
  const t = await getTranslations("landing");
  const tNav = await getTranslations("nav");

  const highlights = [
    {
      icon: Layers,
      title: t("highlights.modular.title"),
      description: t("highlights.modular.description"),
    },
    {
      icon: Smartphone,
      title: t("highlights.premium.title"),
      description: t("highlights.premium.description"),
    },
    {
      icon: ShieldCheck,
      title: t("highlights.enterprise.title"),
      description: t("highlights.enterprise.description"),
    },
  ];

  return (
    <>
      {/* Hero — short, premium, with CTAs to deeper pages */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background" />
        <div className="container relative pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-on-surface-variant">
              <Sparkles className="h-3 w-3 text-accent-violet" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-balance text-headline-xl text-foreground sm:text-display-1">
              <span className="text-gradient">{t("hero.title")}</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base text-on-surface-variant sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-glow-sm">
                <Link href="/sign-up">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/features">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights grid — 3 cards, brief, linking to deeper pages */}
      <section className="container py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h) => (
            <Card key={h.title} className="glass">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="text-headline-sm">{h.title}</h3>
                <p className="text-sm text-on-surface-variant">{h.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="container py-10">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-on-surface-variant">
          {t("trust.title")}
        </p>
        <p className="mt-3 text-center text-sm text-on-surface-variant">{t("trust.subtitle")}</p>
      </section>

      {/* Final CTA */}
      <section className="container pb-24 pt-10">
        <Card className="overflow-hidden border-border bg-gradient-to-br from-surface to-surface-low">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-12">
            <h2 className="text-headline-lg sm:text-headline-xl">{t("cta.title")}</h2>
            <p className="max-w-xl text-sm text-on-surface-variant sm:text-base">
              {t("cta.subtitle")}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-glow-sm">
                <Link href="/sign-up">{t("cta.button")}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/pricing">{tNav("pricing")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

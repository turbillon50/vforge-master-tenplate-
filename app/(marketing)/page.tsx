import Link from "next/link";
import { getLocale } from "next-intl/server";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Headset,
  RefreshCw,
  Sparkles,
  Layers,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MomentumMark } from "@/components/brand/MomentumLogo";
import { appConfig } from "@/config/app.config";

const TECH_STACK = [
  "OpenAI",
  "Replit",
  "GitHub",
  "Vercel",
  "Supabase",
  "AWS",
  "Twilio",
  "SendGrid",
  "Stripe",
  "Clerk",
  "Resend",
  "v0",
  "Cursor",
  "Google Maps",
  "Cloudinary",
];

export default async function LandingPage() {
  const locale = (await getLocale()) as "en" | "es";
  const es = locale === "es";

  const trust = [
    {
      icon: ShieldCheck,
      title: es ? "Sin sorpresas, sin tensiones." : "No surprises, no friction.",
      subtitle: es ? "Transparencia total." : "Full transparency.",
    },
    {
      icon: Users,
      title: es ? "Acompañamiento real" : "Real partnership",
      subtitle: es ? "desde el primer día." : "from day one.",
    },
    {
      icon: Headset,
      title: es ? "Soporte post-venta" : "Post-launch support",
      subtitle: es ? "siempre incluido." : "always included.",
    },
    {
      icon: RefreshCw,
      title: es ? "Mejoras y actualizaciones" : "Continuous upgrades",
      subtitle: es ? "continuas." : "and improvements.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 mesh-bg opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-background/40 to-background" />

        <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center animate-fade-up">
            <MomentumMark size={72} />
            <p
              className="-mt-2 text-[10px] font-medium uppercase text-accent-electric sm:text-xs"
              style={{ letterSpacing: "0.4em" }}
            >
              SaaS · Technology · Apps · Design
            </p>

            <h1 className="text-balance text-headline-xl sm:text-display-1 leading-tight">
              <span className="text-chrome">
                {es ? "Tu app. Tu negocio." : "Your app. Your business."}
              </span>{" "}
              <span className="text-accent-electric drop-shadow-[0_0_22px_hsl(var(--color-accent-electric)/0.5)]">
                {es ? "Sin tensiones." : "No friction."}
              </span>
            </h1>

            <p className="max-w-2xl text-pretty text-base text-on-surface-variant sm:text-lg">
              {es
                ? "Desarrollamos apps, sistemas y herramientas digitales que te ayudan a vender, operar y escalar tu negocio con tecnología."
                : "We build apps, systems and digital tools that help you sell, operate and scale your business with technology."}
            </p>

            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-glow-electric">
                <Link href="/contact">
                  {es ? "Cuéntanos de tu proyecto" : "Tell us about your project"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">{es ? "Ver precios" : "See pricing"}</Link>
              </Button>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
              <Sparkles className="h-3 w-3 text-accent-electric" />
              {es ? "Demo gratis en 24 horas · sin compromiso" : "Free 24h demo · no commitment"}
            </p>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="container py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <Card key={t.title} className="glass border-border/40">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-electric/12 text-accent-electric">
                  <t.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.title}</p>
                  <p className="text-xs text-on-surface-variant">{t.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="glass">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-electric/15 text-accent-electric">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-headline-sm">
                {es ? "Modular y escalable" : "Modular and scalable"}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {es
                  ? "Activamos los módulos que tu negocio necesita. Ecommerce, reservas, pagos, CRM, AI, mensajería — y se conectan entre sí."
                  : "We activate the modules your business needs. Ecommerce, booking, payments, CRM, AI, messaging — and they wire together."}
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-electric/15 text-accent-electric">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-headline-sm">
                {es ? "Apps premium e instalables" : "Premium installable apps"}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {es
                  ? "Cada proyecto es una PWA instalable en celular y publicable en App Store y Google Play."
                  : "Every project is a PWA — installable on phones and publishable to the App Store and Google Play."}
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-electric/15 text-accent-electric">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-headline-sm">
                {es ? "Demo gratis en 24 horas" : "Free demo in 24 hours"}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {es
                  ? "Antes de cobrarte nada, te entregamos un demo funcional de tu idea. Sin sorpresas."
                  : "Before you pay anything, we deliver a working demo of your idea. No surprises."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TECH STACK STRIP */}
      <section className="border-y border-border/60 bg-surface/30 py-12">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-on-surface-variant">
            {es ? "Tecnología que utilizamos" : "Tools we build with"}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-on-surface-variant">
            {TECH_STACK.map((t) => (
              <span key={t} className="opacity-80 transition-opacity hover:opacity-100">
                {t}
              </span>
            ))}
            <span className="opacity-60">{es ? "y más…" : "and more…"}</span>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-electric">
            {es ? "Pricing transparente" : "Transparent pricing"}
          </p>
          <h2 className="mt-3 text-balance text-headline-lg sm:text-headline-xl">
            <span className="text-chrome">
              {es
                ? "Un solo precio. Cuatro etapas. Cero sorpresas."
                : "One price. Four stages. Zero surprises."}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-variant sm:text-base">
            {es
              ? `Desde $12,000 MXN. Demo gratis · ${appConfig.pricing.leadTimeDays.min} a ${appConfig.pricing.leadTimeDays.max} días hábiles.`
              : `Starting at $12,000 MXN. Free demo · ${appConfig.pricing.leadTimeDays.min}-${appConfig.pricing.leadTimeDays.max} business days delivery.`}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild size="lg" className="shadow-glow-electric">
              <Link href="/pricing">
                {es ? "Ver desglose completo" : "See full breakdown"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container pb-24">
        <Card className="relative overflow-hidden border-accent-electric/20 bg-gradient-to-br from-surface to-surface-low">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
          <CardContent className="relative flex flex-col items-center gap-5 px-6 py-14 text-center sm:px-12">
            <MomentumMark size={56} />
            <h2 className="text-headline-lg sm:text-headline-xl text-chrome">
              {es ? "¿Listo para arrancar?" : "Ready to start?"}
            </h2>
            <p className="max-w-xl text-sm text-on-surface-variant sm:text-base">
              {es
                ? "Cuéntanos qué quieres construir. Respondemos en menos de 24 horas con un demo gratis."
                : "Tell us what you want to build. We respond in less than 24 hours with a free demo."}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-glow-electric">
                <Link href="/contact">
                  {es ? "Iniciar proyecto" : "Start project"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/app">{es ? "Ver demo en vivo →" : "See live demo →"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

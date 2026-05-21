import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Apple, Check, ArrowRight, Sparkles, Rocket, Plug, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/marketing/PageHero";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = { title: "Pricing" };

const STAGE_ICONS = [Sparkles, Rocket, Plug, Wrench] as const;

export default async function PricingPage() {
  const locale = (await getLocale()) as "en" | "es";
  const es = locale === "es";
  const { pricing } = appConfig;
  const fmt = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <PageHero
        eyebrow={es ? "Pricing transparente" : "Transparent pricing"}
        title={es ? "Un solo precio. Cuatro etapas." : "One price. Four stages."}
        lead={
          es
            ? `Desde ${fmt.format(pricing.total)} MXN. Demo gratis · entrega en ${pricing.leadTimeDays.min} a ${pricing.leadTimeDays.max} días hábiles.`
            : `Starting at ${fmt.format(pricing.total)} MXN. Free demo · delivered in ${pricing.leadTimeDays.min}-${pricing.leadTimeDays.max} business days.`
        }
      />

      <section className="container -mt-6 pb-12">
        <Card className="mx-auto max-w-5xl border-accent-electric/30 bg-gradient-to-br from-surface to-surface-low shadow-glow-electric">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
              <div>
                <Badge variant="violet" className="mb-2">
                  {es ? "Plan único" : "Single plan"}
                </Badge>
                <h2 className="text-headline-xl text-chrome">
                  {es ? "Producto Viable Aplicable" : "Applied Viable Product"}
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {es
                    ? "Enfocado en resultados reales · 100% transparente"
                    : "Focused on real results · 100% transparent"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">
                  {es ? "Total del proyecto" : "Project total"}
                </p>
                <p className="text-display-1 font-display tracking-tight text-accent-electric drop-shadow-[0_0_18px_hsl(var(--color-accent-electric)/0.4)]">
                  {fmt.format(pricing.total)}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {pricing.currency} · {es ? "todo incluido" : "all included"}
                </p>
              </div>
            </div>

            <ol className="mt-8 grid gap-4 md:grid-cols-4">
              {pricing.stages.map((stage, i) => {
                const Icon = STAGE_ICONS[i];
                const isFree = stage.amount === 0;
                return (
                  <li key={stage.id} className="relative">
                    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface/40 p-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-md ${
                            isFree
                              ? "bg-accent-emerald/15 text-accent-emerald"
                              : "bg-accent-electric/15 text-accent-electric"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                          {es ? "Etapa" : "Stage"} {i + 1}
                        </span>
                      </div>
                      <h3 className="text-headline-sm">{stage.label[locale]}</h3>
                      <p className="text-xs text-on-surface-variant">{stage.hint[locale]}</p>
                      <p
                        className={`text-2xl font-display tracking-tight ${
                          isFree ? "text-accent-emerald" : "text-foreground"
                        }`}
                      >
                        {isFree ? (es ? "Gratis" : "Free") : fmt.format(stage.amount)}
                      </p>
                    </div>
                    {i < pricing.stages.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-on-surface-variant md:block" />
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
              <ul className="grid gap-1.5 text-sm text-on-surface-variant sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-emerald" />
                  {es ? "Demo gratis en 24 horas" : "Free demo in 24 hours"}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-emerald" />
                  {es
                    ? `Entrega ${pricing.leadTimeDays.min}-${pricing.leadTimeDays.max} días hábiles`
                    : `Delivered in ${pricing.leadTimeDays.min}-${pricing.leadTimeDays.max} business days`}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-emerald" />
                  {es ? "Soporte post-venta incluido" : "Post-launch support included"}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-emerald" />
                  {es ? "Sin sorpresas, transparencia total" : "No surprises, full transparency"}
                </li>
              </ul>
              <Button asChild size="lg" className="shadow-glow-electric">
                <Link href="/contact">
                  {es ? "Empezar ahora" : "Start now"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container py-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            {es ? "Publicación en tiendas (opcional)" : "Store publication (optional)"}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {pricing.addons.map((a) => (
              <Card key={a.id}>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-lg ${
                        a.id === "ios"
                          ? "bg-on-surface/10 text-foreground"
                          : "bg-accent-emerald/15 text-accent-emerald"
                      }`}
                    >
                      {a.id === "ios" ? (
                        <Apple className="h-6 w-6" />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          <path d="M17.523 15.341a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm-11.046 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm11.473-6.265l2.094-3.62a.434.434 0 00-.752-.434l-2.12 3.671a13.144 13.144 0 00-10.344 0L4.708 5.022a.434.434 0 00-.751.434l2.094 3.62A12.4 12.4 0 000 18.5h24a12.4 12.4 0 00-6.05-9.424z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {es ? "Adicional" : "Add-on"}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-display tracking-tight">+{fmt.format(a.amount)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-6">
            <h3 className="text-headline-sm">
              {es ? "Metodología de pago" : "Payment methodology"}
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              {es
                ? "Cobramos al cierre de cada etapa. Si la etapa anterior no fue aprobada, no avanzamos a la siguiente. Tu dinero está protegido por hitos verificables."
                : "We charge at the close of each stage. If the previous stage isn't approved, we don't advance. Your money is protected by verifiable milestones."}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
                {es
                  ? "Aprobación explícita de cada hito antes de cobrar el siguiente."
                  : "Explicit approval of each milestone before charging the next."}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
                {es
                  ? "Facturación electrónica (CFDI) opcional bajo solicitud."
                  : "Electronic invoicing (CFDI) available on request."}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
                {es
                  ? "Si por algún motivo cancelas, sólo pagas las etapas ya entregadas."
                  : "If you cancel for any reason, you only pay for stages already delivered."}
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

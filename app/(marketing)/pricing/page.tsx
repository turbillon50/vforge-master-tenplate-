import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/marketing/PageHero";
import { Check } from "lucide-react";

export const metadata: Metadata = { title: "Pricing" };

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for evaluating the platform.",
    features: ["1 app", "Core modules", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For shipping production apps.",
    features: ["3 apps", "All modules", "Email + chat support", "Priority queue"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams running multiple apps.",
    features: [
      "Unlimited apps",
      "SSO + advanced RBAC",
      "Dedicated success manager",
      "SLA + custom integrations",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={
                p.highlight
                  ? "border-accent-violet/40 shadow-glow-sm"
                  : ""
              }
            >
              <CardContent className="flex flex-col gap-5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-headline-md">{p.name}</h3>
                  {p.highlight && <Badge variant="violet">Most popular</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-display-1 font-display">{p.price}</span>
                  <span className="text-sm text-on-surface-variant">{p.period}</span>
                </div>
                <p className="text-sm text-on-surface-variant">{p.description}</p>
                <ul className="flex flex-col gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent-emerald" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-2" variant={p.highlight ? "default" : "outline"}>
                  <Link href={p.highlight ? "/sign-up" : "/contact"}>{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-on-surface-variant">
          Plans are placeholders. Edit them from Admin → Settings.
        </p>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/marketing/PageHero";
import { modulesConfig } from "@/config/modules.config";
import {
  ShoppingBag,
  CalendarCheck,
  Store,
  Car,
  Users,
  BarChart3,
  CreditCard,
  Bell,
  Sparkles,
  Wallet,
  Repeat,
  LayoutTemplate,
  MessagesSquare,
} from "lucide-react";

export const metadata: Metadata = { title: "Features" };

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  CalendarCheck,
  Store,
  Car,
  Users,
  BarChart3,
  CreditCard,
  Bell,
  Sparkles,
  Wallet,
  Repeat,
  LayoutTemplate,
  MessagesSquare,
};

export default async function FeaturesPage() {
  const t = await getTranslations("features");
  const locale = (await getLocale()) as "en" | "es";
  const modules = Object.values(modulesConfig);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = ICONS[m.icon] ?? Sparkles;
            return (
              <Card key={m.id} className="hover:bg-surface-high transition-colors">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="neutral">{m.category}</Badge>
                  </div>
                  <h3 className="text-headline-sm">{m.name[locale]}</h3>
                  <p className="text-sm text-on-surface-variant">{m.description[locale]}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}

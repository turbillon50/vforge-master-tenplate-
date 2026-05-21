import { getCurrentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEnabledModulesAsync } from "@/lib/modules/registry";
import { getLocale } from "next-intl/server";
import { Sparkles, ArrowUpRight, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";

export default async function AppDashboard() {
  const user = await getCurrentUser();
  const tApp = await getTranslations("app");
  const modules = await getEnabledModulesAsync();
  const locale = (await getLocale()) as "en" | "es";

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          {tApp("dashboard")}
        </p>
        <h1 className="text-headline-xl">
          <span className="text-gradient">
            {locale === "es" ? "Hola" : "Hi"}, {user?.fullName ?? user?.email}
          </span>
        </h1>
      </header>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          {locale === "es" ? "Tus módulos" : "Your modules"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules
            .filter((m) => m.navItems.length > 0)
            .map((m) => {
              const Icon =
                ((Icons as unknown as Record<string, LucideIcon>)[m.icon] ?? Sparkles);
              return (
                <Link key={m.id} href={m.navItems[0]?.href ?? "/app"}>
                  <Card className="group transition-colors hover:bg-surface-high">
                    <CardContent className="flex items-start gap-3 p-5">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-headline-sm">{m.name[locale]}</h3>
                          <ArrowUpRight className="h-4 w-4 text-on-surface-variant transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          {m.description[locale]}
                        </p>
                        <Badge variant="neutral" className="mt-3">
                          {m.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

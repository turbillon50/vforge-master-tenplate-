import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INDUSTRY_LIST, DEFAULT_INDUSTRY } from "@/config/industry.config";
import { getLocale } from "next-intl/server";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Boxes } from "lucide-react";

export default async function IndustryAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  const active = DEFAULT_INDUSTRY;

  return (
    <AdminStubPage
      title="Industry Templates"
      description="Pre-wired industry templates: roles, modules, dashboards, communication and payment flows."
      capabilities={[
        "Activate one template per app",
        "Default UI archetype + integrations",
        "Seed roles + modules + flows",
        "Override at runtime per workspace",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_LIST.map((it) => {
          const Icon =
            ((Icons as unknown as Record<string, LucideIcon>)[it.icon] ?? Boxes);
          const isActive = it.id === active;
          return (
            <Card key={it.id} className={isActive ? "border-accent-violet/60" : ""}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-headline-sm">{it.name[locale]}</h3>
                  </div>
                  {isActive ? (
                    <Badge variant="violet">active</Badge>
                  ) : (
                    <Badge variant="neutral">available</Badge>
                  )}
                </div>
                <p className="mt-2 text-xs text-on-surface-variant">{it.tagline[locale]}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {it.modules.slice(0, 5).map((m) => (
                    <Badge key={m} variant="neutral" className="text-[10px]">
                      {m}
                    </Badge>
                  ))}
                  {it.modules.length > 5 && (
                    <Badge variant="neutral" className="text-[10px]">
                      +{it.modules.length - 5}
                    </Badge>
                  )}
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-on-surface-variant">
                  UI archetype: {it.recommendedArchetype} · {it.roles.length} roles
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminStubPage>
  );
}

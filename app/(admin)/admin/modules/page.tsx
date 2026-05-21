import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { modulesConfig } from "@/config/modules.config";
import { getLocale } from "next-intl/server";

export default async function ModulesAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  const modules = Object.values(modulesConfig);
  return (
    <AdminStubPage
      title="Modules"
      description="Toggle modules on/off. DB override persists across deploys."
      capabilities={[
        "Toggle wired to `module_settings` table",
        "Disabling a module hides routes + nav items",
        "Auto-revalidates client navigation on change",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm">{m.name[locale]}</h3>
                <Badge variant={m.enabled ? "emerald" : "neutral"}>
                  {m.enabled ? "on" : "off"}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant">{m.description[locale]}</p>
              <Badge variant="neutral" className="mt-3">
                {m.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}

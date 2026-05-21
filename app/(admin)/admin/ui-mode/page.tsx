import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ARCHETYPE_LIST } from "@/config/ui-mode.config";
import { getArchetype } from "@/lib/ui-mode";
import { ArchetypePicker } from "@/components/admin/ArchetypePicker";
import { getLocale } from "next-intl/server";

export default async function UIArchetypeAdminPage() {
  const current = await getArchetype();
  const locale = (await getLocale()) as "en" | "es";
  return (
    <AdminStubPage
      title="UI Archetypes"
      description="Visual operating modes. Backend, modules, users and data remain identical — only presentation changes."
      capabilities={[
        "fintech, cinematic, operations, productivity, marketplace, messaging",
        "data-archetype on <html> + CSS token overrides",
        "Persisted in cookie + app_settings",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {ARCHETYPE_LIST.map((a) => (
          <Card key={a.key} className={a.key === current ? "border-accent-violet/60" : ""}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm">{a.label[locale]}</h3>
                {a.key === current ? (
                  <Badge variant="violet">active</Badge>
                ) : (
                  <Badge variant="neutral">available</Badge>
                )}
              </div>
              <p className="mt-1 text-xs text-on-surface-variant">{a.description[locale]}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                <div>density: {a.density}</div>
                <div>nav: {a.navStyle}</div>
                <div>card: {a.cardStyle}</div>
                <div>anim: {a.animation}</div>
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-on-surface-variant">
                inspired by: {a.inspiredBy.join(" · ")}
              </p>
              <ArchetypePicker archetype={a.key} active={a.key === current} />
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}

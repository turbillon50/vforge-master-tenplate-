import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featureFlagDefaults } from "@/config/feature-flags.config";

export default function FeatureFlagsAdminPage() {
  const grouped = featureFlagDefaults.reduce<Record<string, typeof featureFlagDefaults>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
  return (
    <AdminStubPage
      title="Feature Flags"
      description="Defaults from `config/feature-flags.config.ts`. DB row overrides."
      capabilities={["Toggle live", "Scope to environment", "Conditional rollout (planned)"]}
    >
      <div className="space-y-6">
        {Object.entries(grouped).map(([category, flags]) => (
          <div key={category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {category}
            </h3>
            <div className="grid gap-2 md:grid-cols-2">
              {flags.map((f) => (
                <Card key={f.key}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-foreground">{f.key}</p>
                      <p className="text-xs text-on-surface-variant">{f.description}</p>
                    </div>
                    <Badge variant={f.defaultEnabled ? "emerald" : "neutral"}>
                      {f.defaultEnabled ? "on" : "off"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminStubPage>
  );
}

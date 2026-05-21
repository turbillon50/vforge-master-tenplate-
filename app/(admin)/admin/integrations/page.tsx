import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { integrationsConfig, isIntegrationConfigured } from "@/config/integrations.config";
import { ExternalLink } from "lucide-react";

export default function IntegrationsAdminPage() {
  const items = Object.values(integrationsConfig).map((i) => ({
    ...i,
    configured: isIntegrationConfigured(i.id),
  }));
  return (
    <AdminStubPage
      title="Integrations"
      description="Health and configuration of every external integration."
      capabilities={[
        "Detects missing env vars",
        "Ping live endpoints (planned)",
        "Per-integration enable/disable",
      ]}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((i) => (
          <Card key={i.id}>
            <CardContent className="flex items-start gap-3 p-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-headline-sm">{i.name}</h3>
                  {i.required && <Badge variant="violet">required</Badge>}
                </div>
                <p className="mt-1 text-xs text-on-surface-variant">{i.description}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                  {i.envVars.join(" · ")}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {i.configured ? (
                  <Badge variant="emerald">connected</Badge>
                ) : (
                  <Badge variant="amber">missing env</Badge>
                )}
                <Button asChild size="sm" variant="ghost">
                  <a href={i.docsUrl} target="_blank" rel="noopener noreferrer">
                    Docs <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}

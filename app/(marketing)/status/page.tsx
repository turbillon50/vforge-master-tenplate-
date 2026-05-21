import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/marketing/PageHero";
import { integrationsConfig, isIntegrationConfigured } from "@/config/integrations.config";
import { Activity, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Status" };

export default function StatusPage() {
  const integrations = Object.values(integrationsConfig).map((i) => ({
    ...i,
    configured: isIntegrationConfigured(i.id),
  }));

  const operational = integrations.filter((i) => i.configured).length;
  const total = integrations.length;
  const overallOk = operational === total;

  return (
    <>
      <PageHero title="System status" lead="Live snapshot of the platform and its integrations." />
      <section className="container pb-20">
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                Overall
              </p>
              <p className="mt-1 text-headline-lg">
                {overallOk ? "All systems operational" : "Some services in demo mode"}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {operational} / {total} integrations connected.
              </p>
            </div>
            {overallOk ? (
              <CheckCircle2 className="h-12 w-12 text-accent-emerald" />
            ) : (
              <AlertCircle className="h-12 w-12 text-accent-amber" />
            )}
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <Card key={i.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-headline-sm">{i.name}</h3>
                  {i.configured ? (
                    <Badge variant="emerald">operational</Badge>
                  ) : (
                    <Badge variant="amber">demo</Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-on-surface-variant">{i.category}</p>
                <p className="mt-2 text-xs text-on-surface-variant">{i.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardContent className="flex items-start gap-3 p-5">
            <Activity className="mt-0.5 h-4 w-4 text-accent-cyan" />
            <p className="text-xs text-on-surface-variant">
              Incidents and historical uptime will appear here once the status feed
              is connected. Today this page reflects environment configuration.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

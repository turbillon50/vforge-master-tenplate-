import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Activity,
  CreditCard,
  KeyRound,
  MessagesSquare,
  ShieldCheck,
  Users,
  LifeBuoy,
  Bell,
} from "lucide-react";
import { integrationsConfig, isIntegrationConfigured } from "@/config/integrations.config";

export default function AdminOverviewPage() {
  const stats = [
    { icon: Users, label: "Active users", value: "—", color: "violet" as const, hint: "24h" },
    { icon: CreditCard, label: "Revenue", value: "—", color: "emerald" as const, hint: "MTD" },
    { icon: KeyRound, label: "API calls", value: "—", color: "cyan" as const, hint: "24h" },
    { icon: Activity, label: "Errors", value: "—", color: "crimson" as const, hint: "1h" },
  ];

  const integrationsHealth = Object.values(integrationsConfig).slice(0, 6).map((i) => ({
    ...i,
    configured: isIntegrationConfigured(i.id),
  }));

  return (
    <>
      <AdminPageHeader
        title="Overview"
        description="What's happening across the platform."
        badge="live"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-start gap-3 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-on-surface-variant">
                  {s.label} <span className="opacity-60">· {s.hint}</span>
                </p>
                <p className="text-headline-md mt-1">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent-emerald" />
              <h3 className="text-headline-sm">Integration health</h3>
            </div>
            <ul className="divide-y divide-border">
              {integrationsHealth.map((i) => (
                <li key={i.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-on-surface-variant">{i.category}</p>
                  </div>
                  {i.configured ? (
                    <Badge variant="emerald">connected</Badge>
                  ) : (
                    <Badge variant="amber">missing env</Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent-cyan" />
              <h3 className="text-headline-sm">Recent activity</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-on-surface-variant">
                <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0" />
                <span>No recent events. Audit logs populate as the app is used.</span>
              </li>
              <li className="flex items-start gap-2 text-on-surface-variant">
                <Bell className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Configure notification channels in Admin → Communication.</span>
              </li>
              <li className="flex items-start gap-2 text-on-surface-variant">
                <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Support inbox is connected to /contact and /support forms.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Active users (7d)", value: "—" },
  { label: "Signups (7d)", value: "—" },
  { label: "Revenue (MTD)", value: "—" },
  { label: "API calls (24h)", value: "—" },
  { label: "AI completions (24h)", value: "—" },
  { label: "Errors (1h)", value: "—" },
];

export default function AnalyticsAdminPage() {
  return (
    <AdminStubPage
      title="Analytics"
      description="Platform-wide KPIs aggregated from modules, payments, communications and the API center."
      capabilities={[
        "Live KPI strip",
        "Per-module breakdown",
        "Funnel + retention (planned)",
        "Export CSV / webhook out",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <p className="text-xs text-on-surface-variant">{m.label}</p>
              <p className="mt-2 text-headline-md">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}

import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICE_PRICING, AI_PROVIDERS } from "@/config/api.config";

export default function UsageAdminPage() {
  const services = Object.entries(SERVICE_PRICING);
  return (
    <AdminStubPage
      title="Usage & AI Billing"
      description="Metered consumption, AI usage, cost / sale / margin per service."
      capabilities={[
        "Per-user usage with quantity + cost + sale + margin",
        "Per-provider AI billing (resale ready)",
        "Top users + top services",
        "Failed requests + rate-limited",
      ]}
    >
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
        Service catalog (default pricing)
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([k, v]) => (
          <Card key={k}>
            <CardContent className="p-5">
              <p className="font-mono text-xs">{k}</p>
              <p className="mt-1 text-xs text-on-surface-variant">{v.description}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <p className="text-on-surface-variant">cost</p>
                  <p className="font-mono">${v.unitCost}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">sale</p>
                  <p className="font-mono">${v.salePrice}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">unit</p>
                  <p className="font-mono">{v.unit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
        Supported AI providers
      </h3>
      <div className="flex flex-wrap gap-2">
        {AI_PROVIDERS.map((p) => (
          <Badge key={p} variant="neutral">
            {p}
          </Badge>
        ))}
      </div>
    </AdminStubPage>
  );
}

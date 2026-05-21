import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CREDIT_PACKS } from "@/config/api.config";

export default function CreditsAdminPage() {
  return (
    <AdminStubPage
      title="Credits"
      description="Prepaid credit wallets, top-ups, adjustments, refunds."
      capabilities={[
        "Wallet view per user",
        "Manual adjustment with reason + audit",
        "Top-up via Stripe / Mercado Pago",
        "Credit pack catalog",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CREDIT_PACKS.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-5">
              <Badge variant="violet">{p.label}</Badge>
              <p className="mt-3 text-headline-md">{p.credits.toLocaleString()} cr</p>
              <p className="text-xs text-on-surface-variant">${p.priceUSD} USD</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}

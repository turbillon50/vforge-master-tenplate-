import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentsAdminPage() {
  return (
    <AdminStubPage
      title="Payments"
      description="Orders, subscriptions, refunds across Stripe + Mercado Pago."
      capabilities={["Unified ledger across providers", "Refund flow with reason codes", "Subscription lifecycle"]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          Configure Stripe and Mercado Pago via /admin/integrations to start receiving payments.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}

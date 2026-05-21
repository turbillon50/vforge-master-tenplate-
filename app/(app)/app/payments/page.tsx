import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function PaymentsPage() {
  return (
    <ModulePlaceholder
      title="Payments"
      category="core"
      description="Unified payment flows via Stripe + Mercado Pago. Adapters under /integrations."
      bullets={["Checkout session creation", "Webhook handling", "Subscription billing"]}
    />
  );
}

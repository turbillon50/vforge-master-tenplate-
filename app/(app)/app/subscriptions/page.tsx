import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function SubscriptionsPage() {
  return (
    <ModulePlaceholder
      title="Subscriptions"
      category="growth"
      description="Plans, recurring billing, upgrades. Mirrored to Stripe and Mercado Pago."
      bullets={["Plan catalog with prices", "Customer self-service portal", "Dunning + grace periods"]}
    />
  );
}

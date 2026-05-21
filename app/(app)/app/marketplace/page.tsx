import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function MarketplacePage() {
  return (
    <ModulePlaceholder
      title="Marketplace"
      category="industry"
      description="Multi-vendor listings, vendor profiles, orders, payouts."
      bullets={["Vendor onboarding", "Listings with categories", "Split payments via Stripe Connect (planned)"]}
    />
  );
}

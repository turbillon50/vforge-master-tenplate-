import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function WalletPage() {
  return (
    <ModulePlaceholder
      title="Wallet"
      category="growth"
      description="Balances, transactions, payouts. Distinct from API credits (which are metered against usage_ledger)."
      bullets={["Currency-aware balance", "Top-up via Stripe / MP", "Payouts feature-flagged"]}
    />
  );
}

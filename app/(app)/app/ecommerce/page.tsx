import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function EcommercePage() {
  return (
    <ModulePlaceholder
      title="E-commerce"
      category="industry"
      description="Products, cart, checkout, orders. Wired with Stripe + Mercado Pago via /integrations."
      bullets={[
        "Product catalog with rich media (Media Manager)",
        "Cart + checkout with payment provider router",
        "Order management visible from /admin/payments",
      ]}
    />
  );
}

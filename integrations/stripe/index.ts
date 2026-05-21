export { getStripe, isStripeConfigured } from "./client";

export interface CheckoutInput {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  mode?: "payment" | "subscription";
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(input: CheckoutInput): Promise<{ url: string | null; id: string }> {
  const { getStripe } = await import("./client");
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: input.mode ?? "payment",
    line_items: [{ price: input.priceId, quantity: input.quantity ?? 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.customerEmail,
    metadata: input.metadata,
  });
  return { url: session.url, id: session.id };
}

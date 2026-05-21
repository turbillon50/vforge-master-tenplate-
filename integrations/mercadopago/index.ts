export { getMercadoPago, isMercadoPagoConfigured } from "./client";

export interface PreferenceInput {
  title: string;
  unitPrice: number;
  quantity?: number;
  currency?: "MXN" | "USD" | "ARS" | "BRL" | "CLP" | "COP" | "PEN";
  payerEmail?: string;
  successUrl: string;
  failureUrl: string;
  pendingUrl?: string;
  externalReference?: string;
}

export async function createPreference(input: PreferenceInput): Promise<{ id: string; initPoint: string | undefined }> {
  const { getMercadoPago, Preference } = await import("./client");
  const client = getMercadoPago();
  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [
        {
          id: `item_${Date.now()}`,
          title: input.title,
          quantity: input.quantity ?? 1,
          unit_price: input.unitPrice,
          currency_id: input.currency ?? "MXN",
        },
      ],
      payer: input.payerEmail ? { email: input.payerEmail } : undefined,
      back_urls: {
        success: input.successUrl,
        failure: input.failureUrl,
        pending: input.pendingUrl ?? input.successUrl,
      },
      external_reference: input.externalReference,
    },
  });
  return { id: result.id ?? "", initPoint: result.init_point };
}

/**
 * Mercado Pago SDK initialization — lazy.
 */

import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

export function getMercadoPago(): MercadoPagoConfig {
  if (_client) return _client;
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) {
    throw new Error("[mercadopago] MERCADOPAGO_ACCESS_TOKEN is not set");
  }
  _client = new MercadoPagoConfig({ accessToken: token });
  return _client;
}

export const isMercadoPagoConfigured = (): boolean =>
  Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN);

export { Preference, Payment };

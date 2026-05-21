/**
 * Name.com domain check stub.
 * Configure NAMECOM_USERNAME + NAMECOM_TOKEN to enable.
 */

export const isNameComConfigured = (): boolean =>
  Boolean(process.env.NAMECOM_USERNAME && process.env.NAMECOM_TOKEN);

export interface DomainCheckResult {
  domain: string;
  available: boolean;
  price?: number;
}

export async function checkDomainAvailability(domain: string): Promise<DomainCheckResult> {
  const user = process.env.NAMECOM_USERNAME;
  const token = process.env.NAMECOM_TOKEN;
  if (!user || !token) {
    throw new Error("[namecom] credentials not set");
  }
  const auth = Buffer.from(`${user}:${token}`).toString("base64");
  const res = await fetch("https://api.name.com/v4/domains:checkAvailability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({ domainNames: [domain] }),
  });
  if (!res.ok) throw new Error(`[namecom] ${res.status} ${await res.text()}`);
  const data = (await res.json()) as {
    results?: Array<{ domainName: string; purchasable?: boolean; purchasePrice?: number }>;
  };
  const result = data.results?.[0];
  return {
    domain,
    available: Boolean(result?.purchasable),
    price: result?.purchasePrice,
  };
}

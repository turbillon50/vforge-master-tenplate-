export { getTwilio, isTwilioConfigured } from "./client";

export async function sendSMS(input: { to: string; body: string }): Promise<{ sid: string }> {
  const { getTwilio } = await import("./client");
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!from) throw new Error("[twilio] TWILIO_PHONE_NUMBER is not set");
  const msg = await getTwilio().messages.create({ from, to: input.to, body: input.body });
  return { sid: msg.sid };
}

export async function sendWhatsApp(input: { to: string; body: string }): Promise<{ sid: string }> {
  const { getTwilio } = await import("./client");
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  if (!from) throw new Error("[twilio] TWILIO_WHATSAPP_NUMBER is not set");
  const to = input.to.startsWith("whatsapp:") ? input.to : `whatsapp:${input.to}`;
  const fromAddr = from.startsWith("whatsapp:") ? from : `whatsapp:${from}`;
  const msg = await getTwilio().messages.create({ from: fromAddr, to, body: input.body });
  return { sid: msg.sid };
}

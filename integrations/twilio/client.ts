import Twilio from "twilio";

let _twilio: ReturnType<typeof Twilio> | null = null;

export function getTwilio(): ReturnType<typeof Twilio> {
  if (_twilio) return _twilio;
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    throw new Error("[twilio] TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not set");
  }
  _twilio = Twilio(sid, token);
  return _twilio;
}

export const isTwilioConfigured = (): boolean =>
  Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN);

/**
 * Channel router — given a message + channel, dispatch via the right adapter.
 * Channels are pluggable; adapters live under `/integrations/<provider>/`.
 */

import { sendEmail } from "@/integrations/resend";
import { sendSMS, sendWhatsApp } from "@/integrations/twilio";
import type { CommunicationChannel } from "@/config/communication.config";

export interface DispatchInput {
  channel: CommunicationChannel;
  recipientAddress: string;
  subject?: string;
  body: string;
  bodyHtml?: string;
  metadata?: Record<string, unknown>;
}

export interface DispatchResult {
  ok: boolean;
  providerMessageId?: string;
  error?: string;
}

export async function dispatch(input: DispatchInput): Promise<DispatchResult> {
  try {
    switch (input.channel) {
      case "in_app":
        // In-app delivery is a DB insert + push to active sessions (handled by caller).
        return { ok: true };
      case "resend_email": {
        const { id } = await sendEmail({
          to: input.recipientAddress,
          subject: input.subject ?? "Notification",
          html: input.bodyHtml ?? `<p>${input.body}</p>`,
          text: input.body,
        });
        return { ok: true, providerMessageId: id ?? undefined };
      }
      case "twilio_sms": {
        const { sid } = await sendSMS({ to: input.recipientAddress, body: input.body });
        return { ok: true, providerMessageId: sid };
      }
      case "twilio_whatsapp": {
        const { sid } = await sendWhatsApp({ to: input.recipientAddress, body: input.body });
        return { ok: true, providerMessageId: sid };
      }
      case "pwa_push":
        // Implemented separately; the body is enqueued and shipped via Web Push.
        return { ok: true };
      default:
        return { ok: false, error: `unknown_channel:${input.channel}` };
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

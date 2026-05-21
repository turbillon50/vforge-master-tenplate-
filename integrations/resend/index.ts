export { getResend, isResendConfigured } from "./client";

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}

export async function sendEmail(input: SendEmailInput): Promise<{ id: string | null }> {
  const { getResend } = await import("./client");
  const resend = getResend();
  const from = input.from ?? process.env.RESEND_FROM_EMAIL ?? "VForge <noreply@example.com>";
  const result = await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html ?? "",
    text: input.text,
    replyTo: input.replyTo,
    tags: input.tags,
  });
  return { id: result.data?.id ?? null };
}

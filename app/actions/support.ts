"use server";

import { db } from "@/lib/db/client";
import { supportMessages, deletionRequests } from "@/lib/db/schema/support";
import { audit } from "@/lib/audit";

function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function submitContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!input.email || !input.message) {
    return { ok: false, error: "validation" };
  }
  try {
    if (!process.env.DATABASE_URL) {
      console.info("[contact:skip:no-db]", input);
      await audit({
        action: "support.message.submitted",
        targetType: "support_message",
        metadata: { email: input.email, source: "contact", noDb: true },
      });
      return { ok: true };
    }
    const id = uid("sup");
    await db.insert(supportMessages).values({
      id,
      source: "contact",
      name: input.name || null,
      email: input.email,
      subject: input.subject || "(no subject)",
      body: input.message,
      status: "pending",
    });
    await audit({
      action: "support.message.submitted",
      targetType: "support_message",
      targetId: id,
      metadata: { email: input.email, source: "contact" },
    });
    return { ok: true };
  } catch (err) {
    console.error("[contact:error]", err);
    return { ok: false, error: "server" };
  }
}

export async function submitDeletionRequest(input: {
  email: string;
  reason?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!input.email) return { ok: false, error: "validation" };
  try {
    if (!process.env.DATABASE_URL) {
      console.info("[deletion:skip:no-db]", input);
      return { ok: true };
    }
    const id = uid("del");
    await db.insert(deletionRequests).values({
      id,
      email: input.email,
      reason: input.reason ?? null,
      status: "pending",
    });
    await audit({
      action: "account.deletion.requested",
      targetType: "deletion_request",
      targetId: id,
      metadata: { email: input.email },
    });
    return { ok: true };
  } catch (err) {
    console.error("[deletion:error]", err);
    return { ok: false, error: "server" };
  }
}

"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitDeletionRequest } from "@/app/actions/support";
import { AlertTriangle } from "lucide-react";

export function DeleteAccountForm() {
  const t = useTranslations("legal.deleteAccount.form");
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ email: "", reason: "" });
  const [confirmed, setConfirmed] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirmed) return;
    startTransition(async () => {
      const result = await submitDeletionRequest(form);
      if (result.ok) {
        toast.success(t("success"));
        setForm({ email: "", reason: "" });
        setConfirmed(false);
      } else {
        toast.error("Could not submit. Try again.");
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-start gap-3 rounded-lg border border-accent-crimson/40 bg-accent-crimson/5 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 text-accent-crimson" />
        <p className="text-sm text-on-surface-variant">
          This action is irreversible. We will email you to confirm receipt and again when deletion completes.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">{t("reason")}</Label>
        <Textarea
          id="reason"
          rows={4}
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <Checkbox
          checked={confirmed}
          onCheckedChange={(v) => setConfirmed(Boolean(v))}
          className="mt-0.5"
        />
        <span className="text-on-surface-variant">
          I understand my account and personal data will be deleted, and that some records may be retained for legal and accounting reasons.
        </span>
      </label>

      <Button type="submit" disabled={pending || !confirmed} variant="destructive">
        {t("submit")}
      </Button>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "vforge-cookie-consent";

export function CookieConsentBanner() {
  const t = useTranslations("cookies.banner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function decide(value: "accept" | "reject") {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value, at: Date.now() }),
    );
    document.cookie = `vforge-cc=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 animate-fade-up">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-xl glass p-4 shadow-elev sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-violet/15 text-accent-violet">
            <Cookie className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-xs text-on-surface-variant">{t("body")}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <Button variant="ghost" size="sm" onClick={() => decide("reject")}>
            {t("reject")}
          </Button>
          <Button size="sm" onClick={() => decide("accept")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}

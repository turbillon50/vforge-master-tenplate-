"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FAQItem } from "@/services/faq.service";
import { cn } from "@/lib/utils";

export function FAQList({ items, locale }: { items: FAQItem[]; locale: "en" | "es" }) {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        (locale === "es" ? i.questionEs : i.questionEn).toLowerCase().includes(q) ||
        (locale === "es" ? i.answerEs : i.answerEn).toLowerCase().includes(q),
    );
  }, [items, query, locale]);

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          {locale === "es"
            ? "Aún no hay preguntas frecuentes publicadas. El admin puede crearlas desde Admin → FAQs."
            : "No FAQs published yet. Admin can create them at Admin → FAQs."}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
        <Input
          placeholder={locale === "es" ? "Buscar pregunta…" : "Search question…"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((i) => {
          const expanded = open === i.id;
          const q = locale === "es" ? i.questionEs : i.questionEn;
          const a = locale === "es" ? i.answerEs : i.answerEn;
          return (
            <li key={i.id}>
              <Card>
                <CardContent className="p-0">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                    onClick={() => setOpen(expanded ? null : i.id)}
                    aria-expanded={expanded}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="neutral" className="capitalize">
                          {i.categorySlug}
                        </Badge>
                      </div>
                      <p className="mt-2 font-medium">{q}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-on-surface-variant transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                  {expanded && (
                    <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-on-surface-variant">
                      {a}
                    </div>
                  )}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { getLocale } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { LegalPage } from "@/services/legal.service";

export async function LegalShell({ page }: { page: LegalPage }) {
  const locale = (await getLocale()) as "en" | "es";
  const title = locale === "es" ? page.titleEs : page.titleEn;
  const body = locale === "es" ? page.bodyEs : page.bodyEn;

  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            v{page.version} · {formatDate(page.updatedAt)}
          </p>
          <h1 className="mt-2 text-headline-xl sm:text-display-1">
            <span className="text-gradient">{title}</span>
          </h1>
        </header>

        <Card>
          <CardContent className="prose prose-invert max-w-none p-6 text-sm leading-relaxed dark:prose-invert">
            {body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-6 text-headline-md first:mt-0">
                    {para.slice(3)}
                  </h2>
                );
              }
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="mt-4 text-headline-sm">
                    {para.slice(4)}
                  </h3>
                );
              }
              if (para.startsWith("- ")) {
                return (
                  <ul key={i} className="my-3 list-disc space-y-1 pl-5 text-on-surface-variant">
                    {para
                      .split("\n")
                      .filter((l) => l.startsWith("- "))
                      .map((l, j) => (
                        <li key={j}>{l.slice(2)}</li>
                      ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="my-3 text-on-surface-variant">
                  {para}
                </p>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

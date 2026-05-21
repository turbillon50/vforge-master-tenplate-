import Link from "next/link";
import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { legalPages, LEGAL_SLUGS } from "@/config/legal.config";
import { getLocale } from "next-intl/server";

export default async function LegalAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  return (
    <AdminStubPage
      title="Legal Pages"
      description="Edit Terms, Privacy, Cookies, Delete-account, App Store and Play Store policies in EN and ES."
      capabilities={[
        "MDX-style content editor",
        "Version tracking on critical pages",
        "Auto-publishes to /terms, /privacy, etc.",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {LEGAL_SLUGS.map((slug) => {
          const p = legalPages[slug];
          return (
            <Card key={slug}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-headline-sm">{p.label[locale]}</h3>
                  <p className="text-xs text-on-surface-variant">{p.description[locale]}</p>
                  {p.requiresVersionTracking && (
                    <Badge variant="violet" className="mt-2">
                      versioned
                    </Badge>
                  )}
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={p.href} target="_blank">
                    View
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminStubPage>
  );
}

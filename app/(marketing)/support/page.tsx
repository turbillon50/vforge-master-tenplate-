import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/PageHero";
import { LifeBuoy, MessageCircle, BookOpen, Mail } from "lucide-react";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = { title: "Support" };

export default async function SupportPage() {
  const t = await getTranslations("support");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <BookOpen className="h-5 w-5 text-accent-violet" />
              <div>
                <h3 className="text-headline-sm">Documentation</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Read the architecture guide and module authoring docs.
                </p>
                <Button asChild variant="ghost" className="mt-3 px-0">
                  <Link href="/about">Browse docs →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <MessageCircle className="h-5 w-5 text-accent-cyan" />
              <div>
                <h3 className="text-headline-sm">FAQ</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Browse common questions grouped by topic.
                </p>
                <Button asChild variant="ghost" className="mt-3 px-0">
                  <Link href="/faq">Open FAQ →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <Mail className="h-5 w-5 text-accent-emerald" />
              <div>
                <h3 className="text-headline-sm">{t("emailUs")}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  <a
                    href={`mailto:${appConfig.company.supportEmail}`}
                    className="hover:text-foreground"
                  >
                    {appConfig.company.supportEmail}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <LifeBuoy className="h-5 w-5 text-accent-amber" />
              <div>
                <h3 className="text-headline-sm">Contact form</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Send a message and we will reply within one business day.
                </p>
                <Button asChild variant="ghost" className="mt-3 px-0">
                  <Link href="/contact">Open contact form →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

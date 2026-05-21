import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/PageHero";
import { appConfig } from "@/config/app.config";
import { Building2, Mail, Globe } from "lucide-react";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const t = await getTranslations("about");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Building2 className="h-5 w-5 text-accent-violet" />
              <h3 className="mt-2 text-headline-sm">Company</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{appConfig.company.legalName}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Mail className="h-5 w-5 text-accent-cyan" />
              <h3 className="mt-2 text-headline-sm">Support</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{appConfig.company.supportEmail}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Globe className="h-5 w-5 text-accent-emerald" />
              <h3 className="mt-2 text-headline-sm">Web</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{appConfig.url}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone } from "lucide-react";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1fr_320px]">
          <Card>
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-start gap-3 p-5">
                <Mail className="h-5 w-5 text-accent-violet" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href={`mailto:${appConfig.company.supportEmail}`}
                    className="text-sm text-on-surface-variant hover:text-foreground"
                  >
                    {appConfig.company.supportEmail}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-3 p-5">
                <Phone className="h-5 w-5 text-accent-cyan" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-on-surface-variant">Coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

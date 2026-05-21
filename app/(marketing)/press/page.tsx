import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/PageHero";
import { appConfig } from "@/config/app.config";
import { Download, Mail, Newspaper } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Press" };

export default function PressPage() {
  return (
    <>
      <PageHero
        title="Press room"
        lead={`Brand assets, latest news and contact for journalists covering ${appConfig.name}.`}
      />
      <section className="container pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Newspaper className="h-5 w-5 text-accent-violet" />
              <h3 className="mt-2 text-headline-sm">About us</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                {appConfig.company.legalName} — {appConfig.description}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Download className="h-5 w-5 text-accent-cyan" />
              <h3 className="mt-2 text-headline-sm">Brand assets</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                Logos, color palette and screenshots. Editable by admin under
                Admin → Press.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Mail className="h-5 w-5 text-accent-emerald" />
              <h3 className="mt-2 text-headline-sm">Media contact</h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                <Link
                  href={`mailto:${appConfig.company.supportEmail}`}
                  className="text-foreground hover:underline"
                >
                  {appConfig.company.supportEmail}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-headline-sm">Latest news</h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              Press releases will appear here once the admin publishes the first
              entry from Admin → Press.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

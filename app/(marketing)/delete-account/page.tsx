import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/PageHero";
import { DeleteAccountForm } from "@/components/forms/DeleteAccountForm";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "Account Deletion" };

export default async function DeleteAccountPage() {
  const t = await getTranslations("legal.deleteAccount");
  const page = await getLegalPage("delete-account");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-12">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <DeleteAccountForm />
            </CardContent>
          </Card>
        </div>
      </section>
      <LegalShell page={page} />
    </>
  );
}

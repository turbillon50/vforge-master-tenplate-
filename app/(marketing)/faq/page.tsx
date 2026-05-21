import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQList } from "@/components/faq/FAQList";
import { getPublishedFAQs } from "@/services/faq.service";

export const metadata: Metadata = { title: "FAQ" };

export default async function FAQPage() {
  const t = await getTranslations("faq");
  const locale = (await getLocale()) as "en" | "es";
  const items = await getPublishedFAQs();
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="container pb-24">
        <FAQList items={items} locale={locale} />
      </section>
    </>
  );
}

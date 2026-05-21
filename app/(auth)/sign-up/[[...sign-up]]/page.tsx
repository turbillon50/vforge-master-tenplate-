import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");
  const tConsent = await getTranslations("auth.consent");
  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-headline-lg">{t("title")}</h1>
        <p className="mt-1 text-sm text-on-surface-variant">{t("subtitle")}</p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-surface border border-border shadow-elev",
          },
        }}
      />
      <p className="mt-6 text-center text-xs text-on-surface-variant">
        {tConsent("age")} ·{" "}
        <Link href="/terms" className="underline">
          {tConsent("terms")}
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className="underline">
          {tConsent("privacy")}
        </Link>
      </p>
    </div>
  );
}

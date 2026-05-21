import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { IS_DEMO_MODE } from "@/lib/auth";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");
  const tConsent = await getTranslations("auth.consent");

  if (IS_DEMO_MODE) {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <h1 className="text-headline-lg">{t("title")}</h1>
          <p className="mt-1 text-sm text-on-surface-variant">{t("subtitle")}</p>
        </div>
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent-violet/15 text-accent-violet">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-headline-sm">Demo mode active</h2>
            <p className="text-sm text-on-surface-variant">
              Account creation is disabled in the public demo. Enter directly as
              a Demo Admin to explore the full template.
            </p>
            <Button asChild className="w-full">
              <Link href="/app">
                Enter as Demo Admin <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { SignUp } = await import("@clerk/nextjs");
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

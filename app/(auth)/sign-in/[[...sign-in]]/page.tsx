import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { IS_DEMO_MODE } from "@/lib/auth";

export default async function SignInPage() {
  const t = await getTranslations("auth.signIn");

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
              This deployment runs without authentication. Anyone can explore the
              full app, admin and modules as a demo super-admin.
            </p>
            <Button asChild className="w-full">
              <Link href="/app">
                Enter as Demo Admin <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-on-surface-variant">
              Connect Clerk + Neon to enable real authentication.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");
  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-headline-lg">{t("title")}</h1>
        <p className="mt-1 text-sm text-on-surface-variant">{t("subtitle")}</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-surface border border-border shadow-elev",
          },
        }}
      />
    </div>
  );
}

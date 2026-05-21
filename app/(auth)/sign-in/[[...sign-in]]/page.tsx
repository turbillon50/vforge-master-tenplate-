import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export default async function SignInPage() {
  const t = await getTranslations("auth.signIn");
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

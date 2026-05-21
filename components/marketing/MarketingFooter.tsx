import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { appConfig } from "@/config/app.config";
import { getSocialLinks } from "@/services/social-links.service";
import { SocialIcons } from "@/components/social/SocialIcons";

export async function MarketingFooter() {
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const social = await getSocialLinks();

  const productLinks = [
    { label: t("features"), href: "/features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("about"), href: "/about" },
  ];

  const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Delete account", href: "/delete-account" },
    { label: "App Store policy", href: "/ios-policy" },
    { label: "Play Store policy", href: "/android-policy" },
  ];

  const supportLinks = [
    { label: t("support"), href: "/support" },
    { label: t("faq"), href: "/faq" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold">{appConfig.name}</span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs">{tCommon("tagline")}</p>
            <SocialIcons links={social} />
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Product
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-on-surface-variant hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Support
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {supportLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-on-surface-variant hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Legal
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-on-surface-variant hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {appConfig.company.legalName}. All rights reserved.
          </p>
          <p>
            v{appConfig.version} · {appConfig.env}
          </p>
        </div>
      </div>
    </footer>
  );
}

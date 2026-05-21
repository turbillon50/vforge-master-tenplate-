import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { appConfig } from "@/config/app.config";
import { getSocialLinks } from "@/services/social-links.service";
import { SocialIcons } from "@/components/social/SocialIcons";
import { MomentumMark } from "@/components/brand/MomentumLogo";

export async function MarketingFooter() {
  const t = await getTranslations("nav");
  const locale = (await getLocale()) as "en" | "es";
  const social = await getSocialLinks();

  const productLinks = [
    { label: t("features"), href: "/features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("about"), href: "/about" },
  ];

  const legalLinks =
    locale === "es"
      ? [
          { label: "Términos", href: "/terms" },
          { label: "Privacidad", href: "/privacy" },
          { label: "Cookies", href: "/cookies" },
          { label: "Borrar cuenta", href: "/delete-account" },
          { label: "Política App Store", href: "/ios-policy" },
          { label: "Política Play Store", href: "/android-policy" },
        ]
      : [
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

  const whatsappLink = `https://wa.me/${appConfig.company.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <MomentumMark size={34} />
              <span className="text-lg font-medium text-chrome tracking-tight">Momentum</span>
            </div>
            <p
              className="text-[10px] font-medium uppercase text-accent-electric"
              style={{ letterSpacing: "0.32em" }}
            >
              SaaS · Technology · Apps · Design
            </p>
            <p className="text-sm text-on-surface-variant max-w-sm">
              {locale === "es"
                ? "Tu app. Tu negocio. Sin tensiones."
                : "Your app. Your business. No friction."}
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent-electric" />
                <a
                  href={`mailto:${appConfig.company.supportEmail}`}
                  className="hover:text-foreground"
                >
                  {appConfig.company.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 text-accent-electric" />
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  WhatsApp · {appConfig.company.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent-electric" />
                <span>{appConfig.company.address}</span>
              </li>
            </ul>
            <SocialIcons links={social} />
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {locale === "es" ? "Producto" : "Product"}
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
              {locale === "es" ? "Soporte" : "Support"}
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
              {locale === "es" ? "Legal" : "Legal"}
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

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Vº Momentum. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p>
            v{appConfig.version} · {appConfig.env}
          </p>
        </div>
      </div>
    </footer>
  );
}

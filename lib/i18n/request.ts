import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { appConfig } from "@/config/app.config";

const SUPPORTED = appConfig.supportedLocales as readonly string[];

function isSupported(value: string | undefined | null): value is "en" | "es" {
  return Boolean(value && SUPPORTED.includes(value));
}

async function resolveLocale(): Promise<"en" | "es"> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (isSupported(cookieLocale)) return cookieLocale;

  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (isSupported(tag)) return tag;
  }
  return appConfig.defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  const messages = (await import(`@/i18n/${locale}.json`)).default;
  return { locale, messages };
});

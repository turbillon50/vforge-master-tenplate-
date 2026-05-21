import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { appConfig } from "@/config/app.config";
import { brandingConfig } from "@/config/branding.config";
import { RegisterSW } from "@/components/pwa/RegisterSW";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import { DemoModeBanner } from "@/components/demo/DemoModeBanner";
import { getArchetype, archetypeTokenStyle } from "@/lib/ui-mode";
import { IS_DEMO_MODE } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: appConfig.name, template: `%s · ${appConfig.name}` },
  description: appConfig.description,
  applicationName: appConfig.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: appConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(appConfig.url),
  openGraph: {
    title: appConfig.name,
    description: appConfig.description,
    url: appConfig.url,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    creator: brandingConfig.social.twitter,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: appConfig.pwa.themeColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

const themeBootScript = `
(function() {
  try {
    var cookie = document.cookie.split('; ').find(function(c){return c.indexOf('vforge-theme=')===0;});
    var stored = cookie ? cookie.split('=')[1] : null;
    var pref = stored || window.localStorage.getItem('vforge-theme');
    var theme = pref || ('${appConfig.defaultTheme}');
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const archetype = await getArchetype();

  const tree = (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-archetype={archetype}
      style={archetypeTokenStyle(archetype)}
    >
      <head>
        {/* Avoid theme flash before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-dvh bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme={appConfig.defaultTheme}
            enableSystem
            storageKey="vforge-theme"
            disableTransitionOnChange
          >
            {IS_DEMO_MODE && <DemoModeBanner />}
            {children}
            <CookieConsentBanner />
            <RegisterSW />
            <Toaster richColors position="top-right" closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );

  // Mount ClerkProvider only when configured. In demo mode the entire app
  // works as a super-admin without Clerk loaded — safe for client showcases.
  return IS_DEMO_MODE ? tree : <ClerkProvider>{tree}</ClerkProvider>;
}

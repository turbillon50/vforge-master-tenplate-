import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.clerk.com" },
      { protocol: "https", hostname: "**.clerk.dev" },
      { protocol: "https", hostname: "**.vercel-storage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /dashboard URLs are the brief's canonical names; resolve to /app/*.
      { source: "/dashboard", destination: "/app", permanent: false },
      { source: "/dashboard/messages", destination: "/app/inbox", permanent: false },
      { source: "/dashboard/notifications", destination: "/app/notifications", permanent: false },
      { source: "/dashboard/profile", destination: "/app/profile", permanent: false },
      { source: "/dashboard/settings", destination: "/app/settings", permanent: false },
      { source: "/dashboard/api-center", destination: "/app/api", permanent: false },
      { source: "/dashboard/billing", destination: "/app/billing", permanent: false },
      { source: "/dashboard/help", destination: "/app/help", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);

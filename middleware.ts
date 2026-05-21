import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/features",
  "/pricing",
  "/faq",
  "/contact",
  "/terms",
  "/privacy",
  "/cookies",
  "/delete-account",
  "/support",
  "/status",
  "/press",
  "/knowledge",
  "/splash",
  "/ios-policy",
  "/android-policy",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/(.*)",
  "/api/health",
  "/api/public/(.*)",
  "/manifest.webmanifest",
  "/sw.js",
  "/_next/(.*)",
  "/favicon.ico",
  "/brand/(.*)",
  "/icons/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
);

export default isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isPublicRoute(req)) return NextResponse.next();

      const { userId, sessionClaims } = await auth();

      if (!userId) {
        const url = new URL("/sign-in", req.url);
        url.searchParams.set("redirect_url", req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }

      if (isAdminRoute(req)) {
        const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
        if (role !== "admin" && role !== "super_admin") {
          return NextResponse.redirect(new URL("/app", req.url));
        }
      }

      return NextResponse.next();
    })
  : function passthroughMiddleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)",
    "/(api|trpc)(.*)",
  ],
};

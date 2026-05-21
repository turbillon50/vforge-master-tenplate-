import Link from "next/link";
import { Sparkles } from "lucide-react";

/**
 * Shown on every page when Clerk envs are missing.
 * Lets visitors know they're inside a public preview with a fake super-admin.
 */
export function DemoModeBanner() {
  return (
    <div className="relative z-40 border-b border-accent-violet/30 bg-accent-violet/10 px-4 py-1.5 text-center text-xs">
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-on-surface-variant">
        <Sparkles className="h-3 w-3 text-accent-violet" />
        <span className="font-medium text-foreground">Demo mode</span>
        <span>·</span>
        <span>Full template preview. No auth, no DB.</span>
        <Link
          href="/app"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Enter the app →
        </Link>
      </p>
    </div>
  );
}

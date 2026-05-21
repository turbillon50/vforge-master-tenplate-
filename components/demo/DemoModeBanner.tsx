import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Shown on every page when Clerk envs are missing.
 * Frames the deploy as a "live demo of what we build" — sales asset, not warning.
 */
export function DemoModeBanner() {
  return (
    <div className="relative z-40 border-b border-accent-electric/30 bg-accent-electric/10 px-4 py-1.5 text-center text-xs">
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-on-surface-variant">
        <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent-electric" />
        <span className="font-medium text-foreground">Demo en vivo</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">Explora una app construida con nuestro stack.</span>
        <Link
          href="/app"
          className="ml-1 inline-flex items-center gap-1 font-medium text-accent-electric underline-offset-2 hover:underline"
        >
          Entrar a la app <ArrowRight className="h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}

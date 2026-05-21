/**
 * Vº Momentum logo component.
 *
 * Renders the brand mark (chrome V + electric "0" ring) at any size with
 * optional wordmark + tagline. Uses the inline SVG fallback by default; if you
 * drop a high-resolution PNG into /public/brand/momentum-logo.png the
 * `<MomentumPng />` variant below will use it.
 */

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MarkProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/** Just the V° mark — for headers, favicons, badges. */
export function MomentumMark({ className, size = 40, glow = true }: MarkProps) {
  return (
    <span
      className={cn("inline-block leading-none", className)}
      style={{ width: size, height: size }}
      aria-label="Vº Momentum"
    >
      <svg viewBox="0 0 200 200" width={size} height={size} fill="none">
        <defs>
          <linearGradient id="mm-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f3f7" />
            <stop offset="35%" stopColor="#b8c0cb" />
            <stop offset="55%" stopColor="#5e6470" />
            <stop offset="75%" stopColor="#cdd4dd" />
            <stop offset="100%" stopColor="#f0f3f7" />
          </linearGradient>
          <radialGradient id="mm-ring-glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#1e90ff" stopOpacity="0" />
            <stop offset="75%" stopColor="#1e90ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4fb6ff" stopOpacity="0" />
          </radialGradient>
          <filter id="mm-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {glow && (
          <circle cx="148" cy="118" r="26" fill="url(#mm-ring-glow)" filter="url(#mm-blur)" />
        )}
        <path
          d="M30 50 L100 170 L170 50 L150 50 L100 138 L50 50 Z"
          fill="url(#mm-chrome)"
          stroke="#9aa1ab"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <circle cx="148" cy="118" r="14" fill="none" stroke="#1e90ff" strokeWidth="3.5" />
        <circle
          cx="148"
          cy="118"
          r="14"
          fill="none"
          stroke="#4fb6ff"
          strokeWidth="1.2"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}

interface LogoProps {
  className?: string;
  variant?: "mark" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  pngFirst?: boolean;
}

const SIZE_MAP = {
  sm: { mark: 28, wordmark: "text-base", tagline: "text-[9px]" },
  md: { mark: 36, wordmark: "text-xl", tagline: "text-[10px]" },
  lg: { mark: 56, wordmark: "text-3xl", tagline: "text-xs" },
  xl: { mark: 96, wordmark: "text-5xl", tagline: "text-sm" },
};

/**
 * Full logo — mark + "Momentum" wordmark + optional tagline.
 * When `pngFirst` is true, attempts to render the user-provided PNG;
 * otherwise renders the inline SVG (always reliable).
 */
export function MomentumLogo({
  className,
  variant = "horizontal",
  size = "md",
  showTagline = false,
  pngFirst = false,
}: LogoProps) {
  const s = SIZE_MAP[size];

  if (variant === "mark") {
    return <MomentumMark className={className} size={s.mark} />;
  }

  if (pngFirst) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src="/brand/momentum-logo.png"
          alt="Vº Momentum"
          width={s.mark * 6}
          height={s.mark * 1.5}
          priority
          className="h-auto w-auto"
          style={{ maxHeight: s.mark * 1.4 }}
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <MomentumMark size={s.mark} />
      <span className="flex flex-col leading-none">
        <span
          className={cn("font-medium tracking-tight text-chrome", s.wordmark)}
          style={{ letterSpacing: "-0.025em" }}
        >
          Momentum
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 font-medium uppercase text-accent-electric",
              s.tagline,
            )}
            style={{ letterSpacing: "0.35em" }}
          >
            SaaS · Technology · Apps · Design
          </span>
        )}
      </span>
    </span>
  );
}

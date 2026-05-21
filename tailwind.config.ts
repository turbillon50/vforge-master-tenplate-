import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./packages/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        void: "var(--color-void)",
        ink: "var(--color-ink)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: {
          DEFAULT: "var(--color-surface)",
          low: "var(--color-surface-low)",
          high: "var(--color-surface-high)",
          elev: "var(--color-surface-elev)",
        },
        on: {
          surface: "var(--color-on-surface)",
          "surface-variant": "var(--color-on-surface-variant)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
          violet: "var(--color-accent-violet)",
          cyan: "var(--color-accent-cyan)",
          electric: "var(--color-accent-electric)",
          emerald: "var(--color-accent-emerald)",
          crimson: "var(--color-accent-crimson)",
          amber: "var(--color-accent-amber)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "label-caps": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em", fontWeight: "600" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5rem" }],
        "body-md": ["1rem", { lineHeight: "1.625rem" }],
        "code-block": ["0.8125rem", { lineHeight: "1.4rem" }],
        "headline-sm": ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "headline-md": ["1.375rem", { lineHeight: "1.75rem", fontWeight: "600", letterSpacing: "-0.01em" }],
        "headline-lg": ["1.75rem", { lineHeight: "2.125rem", fontWeight: "650", letterSpacing: "-0.015em" }],
        "headline-xl": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700", letterSpacing: "-0.02em" }],
        "display-1": ["3.5rem", { lineHeight: "3.625rem", fontWeight: "700", letterSpacing: "-0.03em" }],
        "display-2": ["4.5rem", { lineHeight: "4.5rem", fontWeight: "750", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 0% 0%, hsla(265,80%,55%,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(190,80%,55%,0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, hsla(155,70%,50%,0.10) 0px, transparent 50%)",
        "gradient-glow":
          "linear-gradient(135deg, hsla(265,80%,60%,0.15), hsla(190,80%,55%,0.10), transparent)",
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--color-accent-violet)",
        "glow-sm": "0 0 24px -8px var(--color-accent-violet)",
        elev: "0 8px 30px -8px rgb(0 0 0 / 0.30)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.8", filter: "drop-shadow(0 0 6px var(--color-accent-violet))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 16px var(--color-accent-violet))" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "fade-up": "fade-up 0.4s ease-out both",
        shimmer: "shimmer 2.4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;

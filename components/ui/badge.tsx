import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-primary",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive/15 text-destructive",
        outline: "border-border text-foreground",
        emerald: "border-transparent bg-accent-emerald/15 text-accent-emerald",
        amber: "border-transparent bg-accent-amber/15 text-accent-amber",
        cyan: "border-transparent bg-accent-cyan/15 text-accent-cyan",
        violet: "border-transparent bg-accent-violet/15 text-accent-violet",
        crimson: "border-transparent bg-accent-crimson/15 text-accent-crimson",
        blue: "border-transparent bg-accent-electric/15 text-accent-electric",
        neutral: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

# Vº Momentum brand assets

Drop the master logo PNG here as `momentum-logo.png` (recommended ≥ 2000px wide,
transparent background).

Once added, render it with:

```tsx
import { MomentumLogo } from "@/components/brand/MomentumLogo";

<MomentumLogo pngFirst size="lg" />
```

Files in this folder:

- `momentum-logo.svg` — full lockup (mark + "Momentum" wordmark) as inline SVG
- `momentum-mark.svg` — V° mark only (icon variant)
- `momentum-logo.png` *(add yours here)*
- `momentum-mark-192.png` *(add 192×192 icon-only crop)*
- `momentum-mark-512.png` *(add 512×512 icon-only crop)*
- `apple-touch-icon.png` *(add 180×180 icon-only with rounded background)*
- `og-image.png` *(add 1200×630 for social sharing)*

All other rendering paths (`<MomentumMark />`, splash, favicon fallback) work
without the PNG by using the inline SVG approximation.

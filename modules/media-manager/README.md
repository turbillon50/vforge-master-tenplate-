# Media Manager module

Centralized media library used by all other modules.

- Folder hierarchy with per-folder permissions
- Image / video / document storage
- CDN delivery via Vercel Blob / Cloudflare R2 (configurable)
- Per-tenant quotas + usage telemetry
- Admin at `/admin/media`, used in `dynamic-content`, `press-room`, ecommerce

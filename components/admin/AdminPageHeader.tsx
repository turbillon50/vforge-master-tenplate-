import { Badge } from "@/components/ui/badge";

export function AdminPageHeader({
  title,
  description,
  badge,
  actions,
}: {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-headline-lg">{title}</h1>
          {badge && <Badge variant="neutral">{badge}</Badge>}
        </div>
        {description && (
          <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  category?: string;
  bullets?: string[];
}

export function ModulePlaceholder({ title, description, category, bullets }: Props) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-headline-lg">{title}</h1>
            {category && (
              <Badge variant="neutral" className="mt-1">
                {category}
              </Badge>
            )}
          </div>
        </div>
        {description && <p className="text-sm text-on-surface-variant">{description}</p>}
      </header>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-on-surface-variant">
            This module skeleton is wired in but the feature surface is not yet implemented.
            Extend it under <code className="rounded bg-muted px-1 py-0.5 text-xs">/modules/</code> in the
            repository.
          </p>
          {bullets && bullets.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-violet" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

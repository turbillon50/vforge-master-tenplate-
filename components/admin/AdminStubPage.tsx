import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description?: string;
  capabilities?: string[];
  status?: "live" | "skeleton" | "wip";
  children?: React.ReactNode;
}

export function AdminStubPage({
  title,
  description,
  capabilities = [],
  status = "skeleton",
  children,
}: Props) {
  return (
    <>
      <AdminPageHeader title={title} description={description} badge={status} />
      {children}
      {capabilities.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="text-headline-sm">Capabilities</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Badge variant="violet">●</Badge>
                  {c}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}

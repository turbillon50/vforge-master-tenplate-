"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { changeArchetype } from "@/app/actions/ui-mode";
import { toast } from "sonner";
import type { UIArchetype } from "@/config/ui-mode.config";

export function ArchetypePicker({
  archetype,
  active,
}: {
  archetype: UIArchetype;
  active: boolean;
}) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant={active ? "secondary" : "outline"}
      size="sm"
      disabled={active || pending}
      className="mt-3 w-full"
      onClick={() =>
        start(async () => {
          await changeArchetype(archetype);
          toast.success(`Switched to ${archetype}`);
        })
      }
    >
      {active ? "Active" : pending ? "Applying…" : "Use this mode"}
    </Button>
  );
}

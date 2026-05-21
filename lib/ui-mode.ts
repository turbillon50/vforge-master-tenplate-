/**
 * UI Archetype resolver — reads cookie/DB and provides server + client helpers.
 */

import { cookies } from "next/headers";
import { DEFAULT_ARCHETYPE, uiModes, type UIArchetype } from "@/config/ui-mode.config";

export async function getArchetype(): Promise<UIArchetype> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("vforge-archetype")?.value;
  if (raw && raw in uiModes) return raw as UIArchetype;
  return DEFAULT_ARCHETYPE;
}

export function archetypeTokenStyle(archetype: UIArchetype): React.CSSProperties {
  return uiModes[archetype].tokens as unknown as React.CSSProperties;
}

export async function setArchetypeCookie(value: UIArchetype) {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set("vforge-archetype", value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

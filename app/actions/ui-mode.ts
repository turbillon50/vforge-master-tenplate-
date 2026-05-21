"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { uiModes, type UIArchetype } from "@/config/ui-mode.config";

export async function changeArchetype(archetype: UIArchetype) {
  if (!(archetype in uiModes)) throw new Error("invalid_archetype");
  const cookieStore = await cookies();
  cookieStore.set("vforge-archetype", archetype, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}

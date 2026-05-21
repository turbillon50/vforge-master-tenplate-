"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLocaleCookie(locale: "en" | "es") {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}

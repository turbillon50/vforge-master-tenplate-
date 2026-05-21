/**
 * Vercel API stub — used for deploy hooks, project listing, etc.
 */

export const isVercelConfigured = (): boolean => Boolean(process.env.VERCEL_TOKEN);

export async function triggerDeployHook(hookUrl: string): Promise<{ ok: boolean }> {
  const res = await fetch(hookUrl, { method: "POST" });
  return { ok: res.ok };
}

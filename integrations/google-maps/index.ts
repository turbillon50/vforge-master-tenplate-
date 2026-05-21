/**
 * Google Maps loader — client-side. Reads NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 */

export const isGoogleMapsConfigured = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

export async function loadGoogleMaps(): Promise<typeof google.maps | null> {
  if (typeof window === "undefined") return null;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return null;
  const { Loader } = await import("@googlemaps/js-api-loader");
  const loader = new Loader({ apiKey: key, libraries: ["places", "geometry"] });
  await loader.load();
  return google.maps;
}

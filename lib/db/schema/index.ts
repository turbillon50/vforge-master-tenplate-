/**
 * Drizzle schema barrel — re-exports every table.
 * Order matters when there are foreign keys; resolved alphabetically here is fine
 * because Drizzle accepts cross-file references.
 */

export * from "./users";
export * from "./content";
export * from "./faq";
export * from "./legal";
export * from "./social";
export * from "./support";
export * from "./audit";
export * from "./feature-flags";
export * from "./media";
export * from "./modules";
export * from "./settings";
export * from "./communication";
export * from "./user-operations";
export * from "./api-center";

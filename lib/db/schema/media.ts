import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  bigint,
} from "drizzle-orm/pg-core";

/**
 * Media folders — hierarchical tree. `parentId` null = root.
 */
export const mediaFolders = pgTable(
  "media_folders",
  {
    id: text("id").primaryKey(),
    parentId: text("parent_id"),
    name: text("name").notNull(),
    path: text("path").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    createdBy: text("created_by"),
  },
  (table) => ({
    parentIdx: index("media_folders_parent_idx").on(table.parentId),
    pathIdx: index("media_folders_path_idx").on(table.path),
  }),
);

/**
 * Media items — images, videos, PDFs, files. Provider-agnostic.
 * `provider` is one of: local | vercel_blob | s3 | r2 | cloudinary.
 */
export const media = pgTable(
  "media",
  {
    id: text("id").primaryKey(),
    folderId: text("folder_id"),
    type: text("type").notNull(),
    mime: text("mime").notNull(),
    provider: text("provider").notNull().default("local"),
    url: text("url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    width: integer("width"),
    height: integer("height"),
    durationSeconds: integer("duration_seconds"),
    name: text("name").notNull(),
    alt: text("alt"),
    tags: jsonb("tags").$type<string[]>().default([]).notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    uploadedBy: text("uploaded_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    folderIdx: index("media_folder_idx").on(table.folderId),
    typeIdx: index("media_type_idx").on(table.type),
    nameIdx: index("media_name_idx").on(table.name),
  }),
);

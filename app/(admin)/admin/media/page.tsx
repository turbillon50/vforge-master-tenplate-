import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon, Folder, Tags, Upload } from "lucide-react";

export default function MediaAdminPage() {
  return (
    <AdminStubPage
      title="Media Manager"
      description="Central library for images, videos, PDFs, logos, banners, avatars."
      capabilities={[
        "Upload + preview + delete + tagging",
        "Folders + search + filtering",
        "Provider-agnostic: local | vercel_blob | s3 | r2",
        "Reusable via <MediaPicker /> across modules",
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-sm text-on-surface-variant">
            <Upload className="h-6 w-6 text-accent-violet" />
            <p>Drop files here or click to upload.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-sm text-on-surface-variant">
            <Folder className="h-6 w-6 text-accent-cyan" />
            <p>No folders. Create one to organize media.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-sm text-on-surface-variant">
            <Tags className="h-6 w-6 text-accent-emerald" />
            <p>Tag your media for fast search.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid place-items-center rounded-lg border border-dashed border-border p-12 text-center">
        <ImageIcon className="h-8 w-8 text-on-surface-variant" />
        <p className="mt-2 text-sm text-on-surface-variant">
          Your media library is empty.
        </p>
      </div>
    </AdminStubPage>
  );
}

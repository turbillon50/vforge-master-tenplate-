import { AdminStubPage } from "@/components/admin/AdminStubPage";

export default function PressAdminPage() {
  return (
    <AdminStubPage
      title="Press Room"
      description="Brand assets, press releases, journalist contact and media kit."
      capabilities={[
        "Press releases (markdown)",
        "Brand kit downloads",
        "Media contact form",
        "Public at /press",
      ]}
    />
  );
}

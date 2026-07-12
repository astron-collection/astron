import { redirect } from "next/navigation";

export default function LegacyIntegrationsPage(): never {
  redirect("/dashboard/settings/integrations");
}

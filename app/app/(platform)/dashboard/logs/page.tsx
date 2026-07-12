import { redirect } from "next/navigation";

export default function LegacyLogsPage(): never {
  redirect("/dashboard/system/logs");
}

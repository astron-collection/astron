import { redirect } from "next/navigation";

export default function LegacyTicketsPage(): never {
  redirect("/dashboard/support/tickets");
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Sky Genesis Enterprise",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}

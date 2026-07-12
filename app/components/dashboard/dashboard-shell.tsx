"use client";

import * as React from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({
  children,
}: DashboardShellProps): React.JSX.Element {
  return (
    <SidebarProvider className="min-h-screen w-full overflow-x-hidden bg-[#f6f7fb] text-slate-950">
      <DashboardSidebar />
      <SidebarInset className="h-screen overflow-hidden bg-transparent">
        <div className="grid h-screen grid-rows-[auto_1fr]">
          <DashboardTopbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <main className="w-full px-4 py-6 md:px-6 xl:px-7">
              {children}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import * as React from "react";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumbs } from "@/components/dashboard/breadcrumbs";
import { CommandPaletteTrigger } from "@/components/dashboard/command-palette-trigger";
import { EnvironmentBadge } from "@/components/dashboard/environment-badge";
import { GuildSelector } from "@/components/dashboard/guild-selector";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { activeGuild } from "@/data/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function DashboardTopbar(): React.JSX.Element {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <SidebarTrigger className="-ml-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
          <div className="hidden min-w-0 lg:block">
            <DashboardBreadcrumbs />
          </div>
          <div className="relative hidden w-full max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher une page, un article, un module..."
              className="h-10 rounded-full border-slate-200 bg-slate-50 pl-10 text-slate-950 placeholder:text-slate-400"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EnvironmentBadge environment={activeGuild.environment} />
          <StatusBadge status="online" label="Operational" />
          <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 hover:text-slate-950">
            <Bell className="size-4" />
          </Button>
          <GuildSelector />
          <CommandPaletteTrigger />
          <Button asChild variant="outline" size="sm" className="hidden border-slate-200 bg-white text-slate-700 hover:bg-slate-50 lg:inline-flex">
            <Link href="/" target="_blank">
              Voir le site
            </Link>
          </Button>
          <div className="hidden items-center gap-2 lg:flex">
            <Avatar className="size-8">
              <AvatarFallback className="bg-slate-100 text-slate-700">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-700">{user?.name ?? "User"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut, ShieldCheck } from "lucide-react";

import { EnvironmentBadge } from "@/components/dashboard/environment-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { dashboardNavigationGroups } from "@/lib/dashboard/navigation";
import { cn } from "@/lib/utils";
import { activeGuild } from "@/data/dashboard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar(): React.JSX.Element {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "SG";

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200 bg-white">
        <div className="flex items-start gap-3 px-3 py-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#274a86] text-sm font-semibold text-white shadow-sm">
            SGE
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-slate-950">Sky Genesis Enterprise</p>
            <p className="text-xs text-slate-500">Discord Control Center</p>
            <p className="mt-2 truncate text-xs text-slate-500">{activeGuild.name}</p>
            <div className="mt-3">
              <EnvironmentBadge environment={activeGuild.environment} />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        {dashboardNavigationGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isRouteActive(pathname, item.href);
                  const defaultOpen = active || item.children?.some((child) => isRouteActive(pathname, child.href));

                  return (
                    <SidebarMenuItem key={item.href}>
                      {item.children?.length ? (
                        <Collapsible defaultOpen={defaultOpen}>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              isActive={active}
                              className="text-slate-700 hover:bg-slate-100 hover:text-slate-950 data-[active=true]:bg-[#edf3ff] data-[active=true]:text-[#274a86]"
                            >
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((child) => (
                                <SidebarMenuSubItem key={child.href}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isRouteActive(pathname, child.href)}
                                    className="text-slate-500 hover:text-slate-900 data-[active=true]:bg-slate-100 data-[active=true]:text-[#274a86]"
                                  >
                                    <Link href={child.href}>{child.title}</Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={active}
                          className="text-slate-700 hover:bg-slate-100 hover:text-slate-950 data-[active=true]:bg-[#edf3ff] data-[active=true]:text-[#274a86]"
                        >
                          <Link href={item.href}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            {item.badge ? (
                              <span className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                                {item.badge}
                              </span>
                            ) : null}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 bg-white p-3">
        <div className="space-y-2">
          <Link
            href="/dashboard/system/logs"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            <ShieldCheck className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Audit Logs</span>
          </Link>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-9 shrink-0">
              <AvatarFallback className="bg-[#274a86] text-xs text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium text-slate-950">
                {user?.name ?? "SGE Operator"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {user?.email ?? "control-center@skygenesisenterprise.com"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className={cn(
              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
            )}
          >
            <LogOut className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

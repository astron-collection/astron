import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type DashboardPermission =
  | "guild.view"
  | "members.view"
  | "members.manage"
  | "moderation.view"
  | "moderation.manage"
  | "support.view"
  | "support.manage"
  | "automation.manage"
  | "analytics.view"
  | "system.view"
  | "developer.manage"
  | "settings.manage";

export type DashboardStatusTone =
  | "online"
  | "offline"
  | "warning"
  | "critical"
  | "neutral"
  | "info";

export interface DashboardGuild {
  id: string;
  name: string;
  shard: string;
  memberCount: number;
  environment: "Production" | "Staging" | "Sandbox";
}

export interface DashboardNavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  permission?: DashboardPermission;
  badge?: string;
  children?: DashboardNavigationItem[];
}

export interface DashboardNavigationGroup {
  title: string;
  items: DashboardNavigationItem[];
}

export interface DashboardRouteMeta {
  title: string;
  shortTitle?: string;
  description: string;
  href: string;
  section: string;
  parent?: string;
  permission?: DashboardPermission;
}

export interface DashboardMetric {
  label: string;
  value: string;
  description?: string;
  tone?: DashboardStatusTone;
}

export interface DashboardHealthItem {
  name: string;
  status: DashboardStatusTone;
  detail: string;
  latency?: string;
}

export interface DashboardActionItem {
  title: string;
  description: string;
  count: string;
  href: string;
  tone: DashboardStatusTone;
}

export interface DashboardActivityItem {
  id: string;
  category: string;
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
  tone?: DashboardStatusTone;
}

export interface DashboardSectionSummary {
  key: string;
  title: string;
  description: string;
  href: string;
  metrics: DashboardMetric[];
  highlights: string[];
}

export interface DashboardTableColumn<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
}

export interface DashboardTableConfig<T> {
  columns: DashboardTableColumn<T>[];
  rows: T[];
  emptyTitle: string;
  emptyDescription: string;
}

export interface DashboardModuleSummary {
  route: string;
  eyebrow?: string;
  title: string;
  description: string;
  metrics?: DashboardMetric[];
  highlights?: string[];
  table?: DashboardTableConfig<Record<string, string>>;
  activity?: DashboardActivityItem[];
  actions?: DashboardActionItem[];
}

import {
  Activity,
  Bot,
  ChartColumn,
  Cog,
  FolderKanban,
  Gauge,
  LifeBuoy,
  Megaphone,
  Shield,
  Users,
  Wrench,
} from "lucide-react";

import type {
  DashboardNavigationGroup,
  DashboardNavigationItem,
  DashboardRouteMeta,
} from "@/types/dashboard";

export const dashboardNavigationGroups: DashboardNavigationGroup[] = [
  {
    title: "Command",
    items: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: Gauge,
        description: "Global command center for the guild.",
        permission: "guild.view",
      },
      {
        title: "Community",
        href: "/dashboard/community",
        icon: Users,
        description: "Members, roles and onboarding operations.",
        permission: "members.view",
        children: [
          {
            title: "Members",
            href: "/dashboard/community/members",
            icon: Users,
            description: "Membership directory and segmentation.",
            permission: "members.view",
          },
          {
            title: "Roles",
            href: "/dashboard/community/roles",
            icon: Users,
            description: "Role allocation and access baselines.",
            permission: "members.manage",
          },
          {
            title: "Onboarding",
            href: "/dashboard/community/onboarding",
            icon: Users,
            description: "Verification and first-run journeys.",
            permission: "members.manage",
          },
        ],
      },
      {
        title: "Moderation",
        href: "/dashboard/moderation",
        icon: Shield,
        description: "Trust, safety and incident handling.",
        permission: "moderation.view",
        badge: "3",
        children: [
          {
            title: "Queue",
            href: "/dashboard/moderation/queue",
            icon: Shield,
            description: "Open moderation reviews and escalations.",
            permission: "moderation.view",
          },
          {
            title: "Sanctions",
            href: "/dashboard/moderation/sanctions",
            icon: Shield,
            description: "Warnings, bans and active sanctions.",
            permission: "moderation.manage",
          },
          {
            title: "Automod",
            href: "/dashboard/moderation/automod",
            icon: Shield,
            description: "Automatic moderation policy tuning.",
            permission: "moderation.manage",
          },
        ],
      },
      {
        title: "Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
        description: "Tickets and response performance.",
        permission: "support.view",
        children: [
          {
            title: "Tickets",
            href: "/dashboard/support/tickets",
            icon: LifeBuoy,
            description: "Support queue and triage.",
            permission: "support.view",
          },
          {
            title: "Analytics",
            href: "/dashboard/support/analytics",
            icon: LifeBuoy,
            description: "Support throughput and SLA tracking.",
            permission: "support.manage",
          },
        ],
      },
      {
        title: "Automation",
        href: "/dashboard/automation",
        icon: FolderKanban,
        description: "Workflows, templates and orchestration.",
        permission: "automation.manage",
        children: [
          {
            title: "Workflows",
            href: "/dashboard/automation/workflows",
            icon: FolderKanban,
            description: "Operational workflows and automations.",
            permission: "automation.manage",
          },
          {
            title: "Templates",
            href: "/dashboard/automation/templates",
            icon: FolderKanban,
            description: "Reusable automation blueprints.",
            permission: "automation.manage",
          },
        ],
      },
      {
        title: "Engagement",
        href: "/dashboard/engagement",
        icon: Megaphone,
        description: "Campaigns, events and community activation.",
        permission: "guild.view",
        children: [
          {
            title: "Campaigns",
            href: "/dashboard/engagement/campaigns",
            icon: Megaphone,
            description: "Announcements and activation plans.",
            permission: "guild.view",
          },
          {
            title: "Events",
            href: "/dashboard/engagement/events",
            icon: Megaphone,
            description: "Event programming and follow-up.",
            permission: "guild.view",
          },
        ],
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: ChartColumn,
        description: "Growth, activity and operational reporting.",
        permission: "analytics.view",
        children: [
          {
            title: "Growth",
            href: "/dashboard/analytics/growth",
            icon: ChartColumn,
            description: "Member growth and retention signals.",
            permission: "analytics.view",
          },
          {
            title: "Activity",
            href: "/dashboard/analytics/activity",
            icon: Activity,
            description: "Message and session activity.",
            permission: "analytics.view",
          },
          {
            title: "Moderation",
            href: "/dashboard/analytics/moderation",
            icon: Shield,
            description: "Trust and safety reporting.",
            permission: "analytics.view",
          },
          {
            title: "Support",
            href: "/dashboard/analytics/support",
            icon: LifeBuoy,
            description: "Support performance analytics.",
            permission: "analytics.view",
          },
        ],
      },
      {
        title: "System",
        href: "/dashboard/system",
        icon: Bot,
        description: "Bot health, deployments and infrastructure.",
        permission: "system.view",
        children: [
          {
            title: "Health",
            href: "/dashboard/system/health",
            icon: Bot,
            description: "Service health and runtime posture.",
            permission: "system.view",
          },
          {
            title: "Voice",
            href: "/dashboard/system/voice",
            icon: Bot,
            description: "Voice connection stability.",
            permission: "system.view",
          },
          {
            title: "Deployments",
            href: "/dashboard/system/deployments",
            icon: Bot,
            description: "Deployment states and rollout notes.",
            permission: "system.view",
          },
          {
            title: "Logs",
            href: "/dashboard/system/logs",
            icon: Bot,
            description: "Operational audit and runtime logs.",
            permission: "system.view",
          },
        ],
      },
      {
        title: "Developer",
        href: "/dashboard/developer",
        icon: Wrench,
        description: "Commands, webhooks and developer integrations.",
        permission: "developer.manage",
        children: [
          {
            title: "Commands",
            href: "/dashboard/developer/commands",
            icon: Wrench,
            description: "Slash command governance.",
            permission: "developer.manage",
          },
          {
            title: "Webhooks",
            href: "/dashboard/developer/webhooks",
            icon: Wrench,
            description: "Inbound and outbound automation hooks.",
            permission: "developer.manage",
          },
          {
            title: "API Keys",
            href: "/dashboard/developer/api-keys",
            icon: Wrench,
            description: "Credential inventory and rotation.",
            permission: "developer.manage",
          },
          {
            title: "Events",
            href: "/dashboard/developer/events",
            icon: Wrench,
            description: "Gateway and custom event feeds.",
            permission: "developer.manage",
          },
        ],
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Cog,
        description: "Guild configuration, security and integrations.",
        permission: "settings.manage",
        children: [
          {
            title: "General",
            href: "/dashboard/settings/general",
            icon: Cog,
            description: "Core guild settings and defaults.",
            permission: "settings.manage",
          },
          {
            title: "Branding",
            href: "/dashboard/settings/branding",
            icon: Cog,
            description: "Visual identity and presentation rules.",
            permission: "settings.manage",
          },
          {
            title: "Channels",
            href: "/dashboard/settings/channels",
            icon: Cog,
            description: "Channel routing and ownership.",
            permission: "settings.manage",
          },
          {
            title: "Permissions",
            href: "/dashboard/settings/permissions",
            icon: Cog,
            description: "Access policy and role bindings.",
            permission: "settings.manage",
          },
          {
            title: "Notifications",
            href: "/dashboard/settings/notifications",
            icon: Cog,
            description: "Operational alerting and escalations.",
            permission: "settings.manage",
          },
          {
            title: "Integrations",
            href: "/dashboard/settings/integrations",
            icon: Cog,
            description: "Connected systems and contracts.",
            permission: "settings.manage",
          },
          {
            title: "Security",
            href: "/dashboard/settings/security",
            icon: Cog,
            description: "Security guardrails and controls.",
            permission: "settings.manage",
          },
          {
            title: "Advanced",
            href: "/dashboard/settings/advanced",
            icon: Cog,
            description: "Low-level behavior and overrides.",
            permission: "settings.manage",
          },
        ],
      },
    ],
  },
];

function collectRoutes(items: DashboardNavigationItem[]): DashboardRouteMeta[] {
  return items.flatMap((item) => {
    const route: DashboardRouteMeta = {
      title: item.title,
      shortTitle: item.title,
      description: item.description,
      href: item.href,
      section: item.href.split("/")[2] ?? "dashboard",
      permission: item.permission,
    };

    const children = item.children?.map((child) => ({
      title: child.title,
      shortTitle: child.title,
      description: child.description,
      href: child.href,
      section: item.href.split("/")[2] ?? "dashboard",
      parent: item.href,
      permission: child.permission,
    }));

    return [route, ...(children ?? [])];
  });
}

export const dashboardRoutes = dashboardNavigationGroups.flatMap((group) =>
  collectRoutes(group.items),
);

export function getDashboardNavigationItem(
  href: string,
): DashboardNavigationItem | undefined {
  for (const group of dashboardNavigationGroups) {
    for (const item of group.items) {
      if (item.href === href) {
        return item;
      }

      const child = item.children?.find((candidate) => candidate.href === href);
      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function getDashboardRouteMeta(pathname: string): DashboardRouteMeta | undefined {
  return [...dashboardRoutes]
    .sort((left, right) => right.href.length - left.href.length)
    .find((route) => pathname === route.href || pathname.startsWith(`${route.href}/`));
}

export function getDashboardBreadcrumbs(pathname: string): DashboardRouteMeta[] {
  const route = getDashboardRouteMeta(pathname);

  if (!route) {
    return [];
  }

  const breadcrumbs: DashboardRouteMeta[] = [];
  let cursor: DashboardRouteMeta | undefined = route;

  while (cursor) {
    breadcrumbs.unshift(cursor);
    cursor = cursor.parent
      ? dashboardRoutes.find((candidate) => candidate.href === cursor?.parent)
      : undefined;
  }

  if (breadcrumbs[0]?.href !== "/dashboard") {
    const overview = dashboardRoutes.find((routeEntry) => routeEntry.href === "/dashboard");
    if (overview) {
      breadcrumbs.unshift(overview);
    }
  }

  return breadcrumbs;
}

import type {
  DashboardActionItem,
  DashboardActivityItem,
  DashboardGuild,
  DashboardHealthItem,
  DashboardMetric,
  DashboardModuleSummary,
  DashboardSectionSummary,
} from "@/types/dashboard";

export const activeGuild: DashboardGuild = {
  id: "sge-primary",
  name: "Sky Genesis Enterprise",
  shard: "EU-West / Primary",
  memberCount: 15420,
  environment: "Production",
};

export const availableGuilds: DashboardGuild[] = [
  activeGuild,
  {
    id: "sge-support",
    name: "SGE Support Operations",
    shard: "EU-West / Support",
    memberCount: 3201,
    environment: "Production",
  },
  {
    id: "sge-dev",
    name: "SGE Development Sandbox",
    shard: "Internal / Sandbox",
    memberCount: 842,
    environment: "Sandbox",
  },
];

export const commandCenterHeader = {
  title: activeGuild.name,
  subtitle: "Enterprise Control Center for the official SGE Discord guild.",
  globalState: "Stable",
  botStatus: "Operational",
  deployedVersion: "bot@2.8.4",
  updatedAt: "Updated 4 minutes ago",
};

export const commandCenterIndicators: DashboardMetric[] = [
  { label: "Members online", value: "4,218", description: "27.3% of the guild", tone: "online" },
  { label: "In voice", value: "186", description: "Across 9 active channels", tone: "info" },
  { label: "Messages today", value: "8,942", description: "Peak activity at 16:00 UTC", tone: "neutral" },
  { label: "New members", value: "132", description: "24h rolling window", tone: "online" },
  { label: "Open tickets", value: "12", description: "4 require assignment", tone: "warning" },
  { label: "Active incidents", value: "2", description: "1 moderation, 1 system", tone: "critical" },
];

export const serviceHealth: DashboardHealthItem[] = [
  { name: "Discord Gateway", status: "online", detail: "Shard heartbeat stable.", latency: "42ms" },
  { name: "Voice Connection", status: "warning", detail: "Packet loss on one regional node.", latency: "88ms" },
  { name: "Bot Commands", status: "online", detail: "Slash command sync current.", latency: "64ms" },
  { name: "Go API", status: "online", detail: "REST endpoints healthy.", latency: "18ms" },
  { name: "PostgreSQL", status: "online", detail: "Replication lag within threshold.", latency: "12ms" },
  { name: "Redis", status: "online", detail: "Cache hit ratio 97.4%.", latency: "4ms" },
];

export const requiredActions: DashboardActionItem[] = [
  {
    title: "Unassigned tickets",
    description: "Verification and partnership requests are waiting for ownership.",
    count: "4",
    href: "/dashboard/support/tickets",
    tone: "warning",
  },
  {
    title: "Moderation alerts",
    description: "Reports tagged as spam-risk and harassment need review.",
    count: "3",
    href: "/dashboard/moderation/queue",
    tone: "critical",
  },
  {
    title: "Members without role",
    description: "Newly verified members still missing baseline access.",
    count: "17",
    href: "/dashboard/community/onboarding",
    tone: "warning",
  },
  {
    title: "System issues",
    description: "Voice stability incidents remain open on one node.",
    count: "1",
    href: "/dashboard/system/health",
    tone: "critical",
  },
];

export const recentActivity: DashboardActivityItem[] = [
  {
    id: "activity-1",
    category: "Tickets",
    title: "Verification request escalated",
    description: "Ticket #1247 moved to Tier 2 after failed auto-role assignment.",
    timestamp: "5 min ago",
    actor: "Support Lead",
    tone: "warning",
  },
  {
    id: "activity-2",
    category: "Moderation",
    title: "Spam wave contained",
    description: "AutoMod quarantined 23 repeated invite links in #general.",
    timestamp: "18 min ago",
    actor: "Automod",
    tone: "critical",
  },
  {
    id: "activity-3",
    category: "Voice",
    title: "Voice bridge reconnected",
    description: "Regional voice relay recovered after a short packet loss spike.",
    timestamp: "32 min ago",
    actor: "System",
    tone: "info",
  },
  {
    id: "activity-4",
    category: "Commands",
    title: "/deploy-status invoked",
    description: "Release operators checked the bot rollout after the morning deploy.",
    timestamp: "47 min ago",
    actor: "Platform Ops",
    tone: "neutral",
  },
  {
    id: "activity-5",
    category: "Members",
    title: "Batch onboarding completed",
    description: "41 new members passed onboarding and received baseline roles.",
    timestamp: "1 h ago",
    actor: "Community Ops",
    tone: "online",
  },
];

export const sectionSummaries: DashboardSectionSummary[] = [
  {
    key: "community",
    title: "Community",
    description: "Membership, roles, onboarding and access posture.",
    href: "/dashboard/community",
    metrics: [
      { label: "Members", value: "15,420" },
      { label: "Pending onboarding", value: "17", tone: "warning" },
      { label: "Roles audited", value: "12 / 12", tone: "online" },
    ],
    highlights: [
      "Separate member directory from role governance and onboarding workflows.",
      "Prepare permission-aware subroutes for future role management.",
    ],
  },
  {
    key: "moderation",
    title: "Moderation",
    description: "Trust, safety, queue handling and enforcement operations.",
    href: "/dashboard/moderation",
    metrics: [
      { label: "Open reports", value: "3", tone: "critical" },
      { label: "Automod rules", value: "18" },
      { label: "Sanctions today", value: "14", tone: "warning" },
    ],
    highlights: [
      "Queue and sanctions are now separated from automated policy management.",
      "Section metadata already supports future `moderation.manage` gating.",
    ],
  },
  {
    key: "support",
    title: "Support",
    description: "Ticket operations, assignment and response analytics.",
    href: "/dashboard/support",
    metrics: [
      { label: "Open tickets", value: "12", tone: "warning" },
      { label: "Unassigned", value: "4", tone: "critical" },
      { label: "Median response", value: "2.4 h" },
    ],
    highlights: [
      "Support analytics is split from the live queue to keep pages focused.",
      "Legacy `/dashboard/tickets` is preserved through redirection.",
    ],
  },
  {
    key: "automation",
    title: "Automation",
    description: "Workflows, templates and operational repeatability.",
    href: "/dashboard/automation",
    metrics: [
      { label: "Active workflows", value: "9" },
      { label: "Templates", value: "14" },
      { label: "Paused automations", value: "1", tone: "warning" },
    ],
    highlights: [
      "Slash command operations move under Developer, not Automation.",
      "Automation focuses on orchestration instead of endpoint inventory.",
    ],
  },
  {
    key: "engagement",
    title: "Engagement",
    description: "Campaigns, events and community activation planning.",
    href: "/dashboard/engagement",
    metrics: [
      { label: "Live campaigns", value: "2" },
      { label: "Upcoming events", value: "5" },
      { label: "Content approvals", value: "7", tone: "warning" },
    ],
    highlights: [
      "This section is new and intentionally scaffolded for future community programs.",
      "It avoids mixing announcements with system or support concerns.",
    ],
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Community, moderation and support reporting surfaces.",
    href: "/dashboard/analytics",
    metrics: [
      { label: "Retention", value: "84.2%" },
      { label: "Weekly messages", value: "48.9k" },
      { label: "SLA compliance", value: "93.4%" },
    ],
    highlights: [
      "Analytics pages are now topic-based instead of one oversized chart surface.",
      "High-noise generic charts were replaced with structured reporting entry points.",
    ],
  },
  {
    key: "system",
    title: "System",
    description: "Health, deployments, logs and runtime reliability.",
    href: "/dashboard/system",
    metrics: [
      { label: "Service uptime", value: "99.98%" },
      { label: "Open incidents", value: "1", tone: "critical" },
      { label: "Deployments today", value: "2" },
    ],
    highlights: [
      "Legacy `/dashboard/logs` is preserved through redirection to system logs.",
      "Bot and infrastructure status remain visible in the shared shell at all times.",
    ],
  },
  {
    key: "developer",
    title: "Developer",
    description: "Commands, webhooks, keys and event tooling.",
    href: "/dashboard/developer",
    metrics: [
      { label: "Commands", value: "28" },
      { label: "Webhooks", value: "6" },
      { label: "Keys to rotate", value: "1", tone: "warning" },
    ],
    highlights: [
      "Legacy `/dashboard/integrations` capabilities are redistributed here and in Settings.",
      "This section is explicitly prepared for future developer-specific permissions.",
    ],
  },
  {
    key: "settings",
    title: "Settings",
    description: "Guild-level configuration, security and policy surfaces.",
    href: "/dashboard/settings",
    metrics: [
      { label: "Policy domains", value: "8" },
      { label: "Pending reviews", value: "2", tone: "warning" },
      { label: "Security posture", value: "Healthy", tone: "online" },
    ],
    highlights: [
      "Tabbed settings are split into focused subroutes for long-term maintainability.",
      "Configuration is grouped by operational domain rather than mixed into one page.",
    ],
  },
];

export const dashboardModules: DashboardModuleSummary[] = [
  {
    route: "/dashboard/community/members",
    eyebrow: "Community Operations",
    title: "Member Directory",
    description: "Operational view of priority member segments for moderation, support and leadership.",
    metrics: [
      { label: "Verified", value: "15,203" },
      { label: "Pending role sync", value: "17", tone: "warning" },
      { label: "High-risk watchlist", value: "6", tone: "critical" },
    ],
    table: {
      columns: [
        { key: "member", header: "Member" },
        { key: "segment", header: "Segment" },
        { key: "status", header: "Status" },
        { key: "roles", header: "Roles" },
        { key: "lastSeen", header: "Last seen" },
      ],
      rows: [
        { member: "TechEnthusiast", segment: "Developer", status: "Online", roles: "Administrator, Developer", lastSeen: "Now" },
        { member: "CommunityManager", segment: "Operations", status: "Online", roles: "Moderator, Support", lastSeen: "2 min ago" },
        { member: "NewMember", segment: "Onboarding", status: "Pending", roles: "Member", lastSeen: "14 min ago" },
        { member: "SupportHero", segment: "Support", status: "DND", roles: "Support, Moderator", lastSeen: "32 min ago" },
      ],
      emptyTitle: "No members",
      emptyDescription: "Member data will appear here once directory sync is connected.",
    },
  },
  {
    route: "/dashboard/community/roles",
    eyebrow: "Access Governance",
    title: "Role Baselines",
    description: "Role inventory and allocation baselines for the guild.",
    table: {
      columns: [
        { key: "role", header: "Role" },
        { key: "members", header: "Members" },
        { key: "owner", header: "Owner" },
        { key: "policy", header: "Policy" },
      ],
      rows: [
        { role: "Administrator", members: "3", owner: "Direction", policy: "Restricted" },
        { role: "Moderator", members: "8", owner: "Trust & Safety", policy: "Managed" },
        { role: "Developer", members: "24", owner: "Platform", policy: "Managed" },
        { role: "Support", members: "12", owner: "Support Ops", policy: "Managed" },
      ],
      emptyTitle: "No roles",
      emptyDescription: "Role governance data will appear here once directory sync is active.",
    },
  },
  {
    route: "/dashboard/community/onboarding",
    eyebrow: "Onboarding",
    title: "Onboarding Control",
    description: "Track verification, first-role assignment and early-friction drop-off.",
    actions: requiredActions.filter((action) => action.href === "/dashboard/community/onboarding"),
    activity: recentActivity.filter((item) => item.category === "Members"),
  },
  {
    route: "/dashboard/moderation/queue",
    eyebrow: "Trust & Safety",
    title: "Moderation Queue",
    description: "Current report queue and escalations requiring moderator intervention.",
    table: {
      columns: [
        { key: "case", header: "Case" },
        { key: "type", header: "Type" },
        { key: "severity", header: "Severity" },
        { key: "assigned", header: "Assigned" },
        { key: "updated", header: "Updated" },
      ],
      rows: [
        { case: "REP-301", type: "Spam campaign", severity: "Critical", assigned: "Alex", updated: "5 min ago" },
        { case: "REP-299", type: "Harassment", severity: "High", assigned: "Sarah", updated: "18 min ago" },
        { case: "REP-297", type: "Account hijack", severity: "High", assigned: "Unassigned", updated: "31 min ago" },
      ],
      emptyTitle: "Queue clear",
      emptyDescription: "No moderation incidents are awaiting triage.",
    },
  },
  {
    route: "/dashboard/moderation/sanctions",
    eyebrow: "Trust & Safety",
    title: "Sanctions Ledger",
    description: "Warnings, timeouts and bans that remain operationally relevant.",
    table: {
      columns: [
        { key: "member", header: "Member" },
        { key: "action", header: "Action" },
        { key: "reason", header: "Reason" },
        { key: "operator", header: "Operator" },
        { key: "date", header: "Date" },
      ],
      rows: [
        { member: "ShadowUser", action: "Timeout", reason: "Spam", operator: "Alex", date: "Today" },
        { member: "ToxicMember", action: "Warning", reason: "Harassment", operator: "Sarah", date: "Today" },
        { member: "RaidAlt", action: "Ban", reason: "Raid attempt", operator: "Automod", date: "Yesterday" },
      ],
      emptyTitle: "No sanctions",
      emptyDescription: "No active sanctions require follow-up.",
    },
  },
  {
    route: "/dashboard/moderation/automod",
    eyebrow: "Policy Automation",
    title: "Automod Policy",
    description: "Rule coverage, thresholds and recent trigger patterns.",
    metrics: [
      { label: "Enabled rules", value: "18" },
      { label: "Triggered today", value: "67", tone: "warning" },
      { label: "False positives", value: "3", tone: "info" },
    ],
  },
  {
    route: "/dashboard/support/tickets",
    eyebrow: "Support Operations",
    title: "Ticket Queue",
    description: "Operational support queue with ownership and urgency context.",
    table: {
      columns: [
        { key: "ticket", header: "Ticket" },
        { key: "category", header: "Category" },
        { key: "priority", header: "Priority" },
        { key: "assigned", header: "Assigned" },
        { key: "updated", header: "Updated" },
      ],
      rows: [
        { ticket: "#1247 Verification issue", category: "Verification", priority: "High", assigned: "Unassigned", updated: "5 min ago" },
        { ticket: "#1246 Developer role request", category: "Role request", priority: "Medium", assigned: "Sarah", updated: "17 min ago" },
        { ticket: "#1245 Warning appeal", category: "Appeal", priority: "Medium", assigned: "Alex", updated: "38 min ago" },
      ],
      emptyTitle: "No open tickets",
      emptyDescription: "Support load is clear.",
    },
  },
  {
    route: "/dashboard/support/analytics",
    eyebrow: "Support Reporting",
    title: "Support Analytics",
    description: "SLA, backlog and assignment performance indicators.",
    metrics: [
      { label: "Median first reply", value: "2.4 h" },
      { label: "SLA compliance", value: "93.4%" },
      { label: "Backlog delta", value: "-8.2%", tone: "online" },
    ],
  },
  {
    route: "/dashboard/automation/workflows",
    eyebrow: "Automation",
    title: "Operational Workflows",
    description: "Reusable automations that handle recurring Discord operations.",
    table: {
      columns: [
        { key: "workflow", header: "Workflow" },
        { key: "trigger", header: "Trigger" },
        { key: "status", header: "Status" },
        { key: "runs", header: "Runs / 7d" },
      ],
      rows: [
        { workflow: "New Member Onboarding", trigger: "Member join", status: "Active", runs: "342" },
        { workflow: "Ticket Auto-Close", trigger: "Schedule", status: "Active", runs: "19" },
        { workflow: "Level-Up Notification", trigger: "XP event", status: "Paused", runs: "0" },
      ],
      emptyTitle: "No workflows",
      emptyDescription: "Workflow automation has not been configured yet.",
    },
  },
  {
    route: "/dashboard/automation/templates",
    eyebrow: "Automation",
    title: "Template Library",
    description: "Templates used to bootstrap recurring workflows and campaigns.",
    metrics: [
      { label: "Available templates", value: "14" },
      { label: "Draft templates", value: "3" },
      { label: "Needs review", value: "2", tone: "warning" },
    ],
  },
  {
    route: "/dashboard/engagement/campaigns",
    eyebrow: "Community Activation",
    title: "Campaign Planning",
    description: "Announcement cadence, launches and partner communications.",
  },
  {
    route: "/dashboard/engagement/events",
    eyebrow: "Community Activation",
    title: "Event Calendar",
    description: "Event sequencing, owners and post-event reporting.",
  },
  {
    route: "/dashboard/analytics/growth",
    eyebrow: "Analytics",
    title: "Growth Reporting",
    description: "Member growth, retention and onboarding conversion.",
    metrics: [
      { label: "Net growth", value: "+12.5%" },
      { label: "30d retention", value: "84.2%" },
      { label: "Onboarding conversion", value: "92.1%" },
    ],
  },
  {
    route: "/dashboard/analytics/activity",
    eyebrow: "Analytics",
    title: "Activity Reporting",
    description: "Engagement density by channel, period and team.",
    metrics: [
      { label: "Messages / day", value: "8,942" },
      { label: "Voice sessions", value: "186" },
      { label: "Command executions", value: "7,528" },
    ],
  },
  {
    route: "/dashboard/analytics/moderation",
    eyebrow: "Analytics",
    title: "Moderation Reporting",
    description: "Trust and safety throughput, severity mix and incident resolution.",
  },
  {
    route: "/dashboard/analytics/support",
    eyebrow: "Analytics",
    title: "Support Reporting",
    description: "Support load, response quality and escalation pressure.",
  },
  {
    route: "/dashboard/system/health",
    eyebrow: "System Operations",
    title: "Service Health",
    description: "Operational health of the bot, API and supporting services.",
    metrics: [
      { label: "Uptime", value: "99.98%" },
      { label: "Mean latency", value: "42 ms" },
      { label: "Incidents", value: "1", tone: "critical" },
    ],
  },
  {
    route: "/dashboard/system/voice",
    eyebrow: "System Operations",
    title: "Voice Runtime",
    description: "Voice bridge reliability, channel participation and packet health.",
  },
  {
    route: "/dashboard/system/deployments",
    eyebrow: "Release Operations",
    title: "Deployments",
    description: "Recent deployments affecting the bot and dashboard runtime.",
    table: {
      columns: [
        { key: "release", header: "Release" },
        { key: "scope", header: "Scope" },
        { key: "status", header: "Status" },
        { key: "deployed", header: "Deployed" },
      ],
      rows: [
        { release: "bot@2.8.4", scope: "Commands + health checks", status: "Healthy", deployed: "Today 09:12" },
        { release: "dashboard@1.6.0", scope: "Navigation shell", status: "Monitoring", deployed: "Today 09:27" },
      ],
      emptyTitle: "No deployments",
      emptyDescription: "Deployment history will appear here once release telemetry is wired.",
    },
  },
  {
    route: "/dashboard/system/logs",
    eyebrow: "System Operations",
    title: "Operational Logs",
    description: "Condensed operational feed pending live log ingestion.",
    table: {
      columns: [
        { key: "time", header: "Time" },
        { key: "service", header: "Service" },
        { key: "level", header: "Level" },
        { key: "message", header: "Message", className: "min-w-80" },
      ],
      rows: [
        { time: "09:32:18", service: "discord-gateway", level: "WARN", message: "Reconnect cycle triggered after transient heartbeat jitter." },
        { time: "09:30:04", service: "bot-commands", level: "INFO", message: "Slash command sync completed in 214 ms." },
        { time: "09:24:10", service: "go-api", level: "INFO", message: "Health probe returned 200 for all dependencies." },
      ],
      emptyTitle: "No logs",
      emptyDescription: "Runtime logs will appear here once ingestion is connected.",
    },
  },
  {
    route: "/dashboard/developer/commands",
    eyebrow: "Developer Surface",
    title: "Command Registry",
    description: "Govern slash commands, ownership and rollout posture.",
    table: {
      columns: [
        { key: "command", header: "Command" },
        { key: "scope", header: "Scope" },
        { key: "owner", header: "Owner" },
        { key: "status", header: "Status" },
      ],
      rows: [
        { command: "/help", scope: "Global", owner: "Platform", status: "Live" },
        { command: "/ticket", scope: "Support", owner: "Support Ops", status: "Live" },
        { command: "/deploy-status", scope: "Internal", owner: "Platform Ops", status: "Restricted" },
      ],
      emptyTitle: "No commands",
      emptyDescription: "Commands will appear here once registry sync is connected.",
    },
  },
  {
    route: "/dashboard/developer/webhooks",
    eyebrow: "Developer Surface",
    title: "Webhook Inventory",
    description: "Track inbound and outbound webhook contracts.",
    table: {
      columns: [
        { key: "name", header: "Webhook" },
        { key: "channel", header: "Channel" },
        { key: "status", header: "Status" },
        { key: "lastUsed", header: "Last used" },
      ],
      rows: [
        { name: "GitHub Notifications", channel: "#dev-updates", status: "Active", lastUsed: "15 min ago" },
        { name: "Server Status", channel: "#alerts", status: "Active", lastUsed: "2 h ago" },
        { name: "Welcome Messages", channel: "#welcome", status: "Active", lastUsed: "30 min ago" },
      ],
      emptyTitle: "No webhooks",
      emptyDescription: "Webhook contracts will appear here once integration sync is active.",
    },
  },
  {
    route: "/dashboard/developer/api-keys",
    eyebrow: "Developer Surface",
    title: "API Key Registry",
    description: "Credential inventory with rotation and ownership context.",
    table: {
      columns: [
        { key: "name", header: "Key" },
        { key: "scope", header: "Scope" },
        { key: "owner", header: "Owner" },
        { key: "rotation", header: "Rotation" },
      ],
      rows: [
        { name: "discord-enterprise-prod", scope: "Prod runtime", owner: "Platform Ops", rotation: "Due in 12 days" },
        { name: "github-webhook-signing", scope: "GitHub hooks", owner: "Platform", rotation: "Healthy" },
      ],
      emptyTitle: "No keys",
      emptyDescription: "Key inventory will appear here once secrets metadata is wired.",
    },
  },
  {
    route: "/dashboard/developer/events",
    eyebrow: "Developer Surface",
    title: "Event Stream",
    description: "Gateway and custom event contracts prepared for future observability.",
    activity: recentActivity,
  },
  {
    route: "/dashboard/settings/general",
    eyebrow: "Configuration",
    title: "General Settings",
    description: "Core guild defaults, ownership and lifecycle controls.",
  },
  {
    route: "/dashboard/settings/branding",
    eyebrow: "Configuration",
    title: "Branding",
    description: "Guild identity, naming and presentation baselines.",
  },
  {
    route: "/dashboard/settings/channels",
    eyebrow: "Configuration",
    title: "Channels",
    description: "Channel routing, ownership and visibility policy.",
  },
  {
    route: "/dashboard/settings/permissions",
    eyebrow: "Configuration",
    title: "Permissions",
    description: "Role and permission mapping for future access control.",
  },
  {
    route: "/dashboard/settings/notifications",
    eyebrow: "Configuration",
    title: "Notifications",
    description: "Operational notifications and escalation policy.",
  },
  {
    route: "/dashboard/settings/integrations",
    eyebrow: "Configuration",
    title: "Integrations",
    description: "Connected systems and guild-level external dependencies.",
  },
  {
    route: "/dashboard/settings/security",
    eyebrow: "Configuration",
    title: "Security",
    description: "Security guardrails, MFA expectations and operational hardening.",
  },
  {
    route: "/dashboard/settings/advanced",
    eyebrow: "Configuration",
    title: "Advanced",
    description: "Advanced behavior flags and low-level operational overrides.",
  },
];

export function getModuleSummary(route: string): DashboardModuleSummary | undefined {
  return dashboardModules.find((module) => module.route === route);
}

import * as React from "react";

import { ContextPanel } from "@/components/dashboard/context-panel";
import { DashboardPageLayout } from "@/components/dashboard/dashboard-page-layout";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ActionRequiredCard } from "@/components/dashboard/action-required-card";
import { HealthStatusCard } from "@/components/dashboard/health-status-card";
import { SectionNavigation } from "@/components/dashboard/section-navigation";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  commandCenterHeader,
  commandCenterIndicators,
  recentActivity,
  requiredActions,
  sectionSummaries,
  serviceHealth,
} from "@/data/dashboard";
import { dashboardNavigationGroups } from "@/lib/dashboard/navigation";

export function CommandCenterPage(): React.JSX.Element {
  const primaryNavigation = dashboardNavigationGroups[0]?.items.filter(
    (item) => item.href !== "/dashboard",
  );

  return (
    <DashboardPageLayout
      eyebrow="Overview"
      title={commandCenterHeader.title}
      description={commandCenterHeader.subtitle}
      contextPanel={
        <ContextPanel
          title="Operational Snapshot"
          description="Global state intentionally remains visible from every route."
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Global state</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {commandCenterHeader.globalState}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Version</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {commandCenterHeader.deployedVersion}
              </p>
              <p className="mt-2 text-sm text-slate-500">{commandCenterHeader.updatedAt}</p>
            </div>
          </div>
        </ContextPanel>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {commandCenterIndicators.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Health Matrix</h2>
          <p className="mt-1 text-sm text-slate-600">
            Service view focused on operational dependencies required to run the guild.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {serviceHealth.map((item) => (
            <HealthStatusCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Actions Required</h2>
          <p className="mt-1 text-sm text-slate-600">
            Operational pressure points surfaced for administrators, moderators and support.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {requiredActions.map((item) => (
            <ActionRequiredCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-600">
            Ticket, moderation, voice, command and deployment events share one feed.
          </p>
        </div>
        <ActivityFeed items={recentActivity} />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Functional Domains</h2>
          <p className="mt-1 text-sm text-slate-600">
            Each section now has a parent synthesis page and dedicated child routes.
          </p>
        </div>
        <SectionNavigation items={primaryNavigation ?? []} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {sectionSummaries.slice(0, 6).map((section) => (
          <div key={section.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-950">{section.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{section.description}</p>
            <div className="mt-4 space-y-2">
              {section.highlights.map((highlight) => (
                <p key={highlight} className="text-sm text-slate-600">
                  {highlight}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </DashboardPageLayout>
  );
}

import * as React from "react";

import { ContextPanel } from "@/components/dashboard/context-panel";
import { DashboardPageLayout } from "@/components/dashboard/dashboard-page-layout";
import { SectionNavigation } from "@/components/dashboard/section-navigation";
import { StatCard } from "@/components/dashboard/stat-card";
import { sectionSummaries } from "@/data/dashboard";
import { getDashboardNavigationItem } from "@/lib/dashboard/navigation";

interface SectionOverviewPageProps {
  href: string;
}

export function SectionOverviewPage({
  href,
}: SectionOverviewPageProps): React.JSX.Element {
  const navigationItem = getDashboardNavigationItem(href);
  const summary = sectionSummaries.find((item) => item.href === href);

  if (!navigationItem || !summary) {
    return (
      <DashboardPageLayout
        title="Missing section"
        description="The requested section metadata is not registered."
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Section metadata missing for {href}.
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      eyebrow={summary.title}
      title={summary.title}
      description={summary.description}
      contextPanel={
        <ContextPanel
          title="Architecture Notes"
          description="This parent route acts as a synthesis page and gateway to focused child routes."
        >
          <div className="space-y-3">
            {summary.highlights.map((highlight) => (
              <p key={highlight} className="text-sm text-slate-600">
                {highlight}
              </p>
            ))}
          </div>
        </ContextPanel>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {summary.metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Section Routes</h2>
          <p className="mt-1 text-sm text-slate-600">
            Child routes are grouped by function and ready for finer permissions later.
          </p>
        </div>
        <SectionNavigation items={navigationItem.children ?? []} />
      </section>
    </DashboardPageLayout>
  );
}

import * as React from "react";

import { Boxes, Clock3 } from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ContextPanel } from "@/components/dashboard/context-panel";
import { DashboardPageLayout } from "@/components/dashboard/dashboard-page-layout";
import { DataTable } from "@/components/dashboard/data-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { StatCard } from "@/components/dashboard/stat-card";
import { getModuleSummary } from "@/data/dashboard";

interface ModulePageProps {
  route: string;
}

export function ModulePage({ route }: ModulePageProps): React.JSX.Element {
  const module = getModuleSummary(route);

  if (!module) {
    return (
      <DashboardPageLayout
        title="Missing module"
        description="The requested module is not registered in dashboard mocks."
      >
        <EmptyState
          icon={<Boxes className="size-6" />}
          title="Module not found"
          description={`No module summary has been configured for ${route}.`}
        />
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      eyebrow={module.eyebrow}
      title={module.title}
      description={module.description}
      contextPanel={
        <ContextPanel
          title="Implementation State"
          description="This route is frontend-scaffolded and intentionally isolated from any large fake backend."
        >
          <div className="space-y-3 text-sm text-slate-600">
            <p>Data is currently mocked and centralized.</p>
            <p>Permissions can later gate this route through navigation metadata.</p>
          </div>
        </ContextPanel>
      }
    >
      {module.metrics?.length ? (
        <section className="grid gap-4 md:grid-cols-3">
          {module.metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </section>
      ) : null}

      {module.table ? (
        <section className="space-y-4">
          <FilterBar
            placeholder={`Search within ${module.title.toLowerCase()}...`}
            filters={["Owner", "Status", "Priority"]}
          />
          <DataTable config={module.table} />
        </section>
      ) : null}

      {module.activity?.length ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Recent Activity</h2>
            <p className="mt-1 text-sm text-slate-600">
              Operational events related to this module.
            </p>
          </div>
          <ActivityFeed items={module.activity} />
        </section>
      ) : null}

      {module.actions?.length ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Pending Work</h2>
            <p className="mt-1 text-sm text-slate-600">
              Queued actions surfaced for this domain.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {module.actions.map((action) => (
              <div key={action.title} className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 last:border-b-0">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{action.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{action.description}</p>
                </div>
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                  {action.count}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!module.table && !module.activity?.length && !module.actions?.length ? (
        <EmptyState
          icon={<Clock3 className="size-6" />}
          title="Structured placeholder ready"
          description="The route exists, is linked, and is ready to receive live data in the next phase."
        />
      ) : null}
    </DashboardPageLayout>
  );
}

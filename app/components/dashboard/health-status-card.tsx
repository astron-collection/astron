import * as React from "react";

import { StatusBadge } from "@/components/dashboard/status-badge";
import type { DashboardHealthItem } from "@/types/dashboard";

interface HealthStatusCardProps {
  item: DashboardHealthItem;
}

export function HealthStatusCard({
  item,
}: HealthStatusCardProps): React.JSX.Element {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
        </div>
        <StatusBadge status={item.status} label={item.status} className="capitalize" />
      </div>
      {item.latency ? (
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
          Latency {item.latency}
        </p>
      ) : null}
    </article>
  );
}

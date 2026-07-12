import * as React from "react";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/types/dashboard";

interface StatCardProps extends DashboardMetric {
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  tone = "neutral",
  className,
}: StatCardProps): React.JSX.Element {
  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-600">{label}</p>
        <StatusBadge status={tone} label={tone} className="capitalize" />
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
      {description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}
    </article>
  );
}

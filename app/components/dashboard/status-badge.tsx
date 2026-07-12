import * as React from "react";

import { cn } from "@/lib/utils";
import type { DashboardStatusTone } from "@/types/dashboard";

interface StatusBadgeProps {
  status: DashboardStatusTone;
  label: string;
  className?: string;
}

const statusStyles: Record<DashboardStatusTone, string> = {
  online: "border-emerald-200 bg-emerald-50 text-emerald-700",
  offline: "border-slate-200 bg-slate-100 text-slate-600",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  critical: "border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border-slate-200 bg-slate-100 text-slate-600",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

const dotStyles: Record<DashboardStatusTone, string> = {
  online: "bg-emerald-400",
  offline: "bg-slate-400",
  warning: "bg-amber-400",
  critical: "bg-rose-400",
  neutral: "bg-slate-300",
  info: "bg-sky-400",
};

export function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyles[status])} />
      {label}
    </span>
  );
}

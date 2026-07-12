import * as React from "react";

import { cn } from "@/lib/utils";
import type { DashboardActivityItem } from "@/types/dashboard";

interface ActivityFeedProps {
  items: DashboardActivityItem[];
  className?: string;
}

const toneBorder: Record<string, string> = {
  online: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  critical: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  neutral: "border-slate-200 bg-slate-100 text-slate-600",
};

export function ActivityFeed({
  items,
  className,
}: ActivityFeedProps): React.JSX.Element {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-[0.18em]",
                    toneBorder[item.tone ?? "neutral"],
                  )}
                >
                  {item.category}
                </span>
                {item.actor ? <span className="text-xs text-slate-500">{item.actor}</span> : null}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
            <span className="shrink-0 text-xs text-slate-500">{item.timestamp}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

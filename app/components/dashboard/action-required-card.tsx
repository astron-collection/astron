import * as React from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/status-badge";
import type { DashboardActionItem } from "@/types/dashboard";

interface ActionRequiredCardProps {
  item: DashboardActionItem;
}

export function ActionRequiredCard({
  item,
}: ActionRequiredCardProps): React.JSX.Element {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
        </div>
        <StatusBadge status={item.tone} label={item.count} />
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#274a86]">
        Review queue
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

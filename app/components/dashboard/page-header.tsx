import * as React from "react";

import { EnvironmentBadge } from "@/components/dashboard/environment-badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { activeGuild, commandCenterHeader } from "@/data/dashboard";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{eyebrow}</p>
          ) : null}
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <EnvironmentBadge environment={activeGuild.environment} />
        <StatusBadge status="online" label={commandCenterHeader.botStatus} />
        <StatusBadge status="neutral" label={commandCenterHeader.deployedVersion} />
      </div>
    </div>
  );
}

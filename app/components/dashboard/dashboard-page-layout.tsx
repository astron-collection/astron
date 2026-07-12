import * as React from "react";

import { PageHeader } from "@/components/dashboard/page-header";

interface DashboardPageLayoutProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  contextPanel?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardPageLayout({
  eyebrow,
  title,
  description,
  actions,
  contextPanel,
  children,
}: DashboardPageLayoutProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">{children}</div>
        {contextPanel ? <div className="space-y-6">{contextPanel}</div> : null}
      </div>
    </div>
  );
}

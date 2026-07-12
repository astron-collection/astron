import * as React from "react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps): React.JSX.Element {
  return (
    <Empty className="border border-dashed border-slate-200 bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle className="text-slate-950">{title}</EmptyTitle>
        <EmptyDescription className="text-slate-500">{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="text-slate-400">
        This area is scaffolded for the next implementation phase.
      </EmptyContent>
    </Empty>
  );
}

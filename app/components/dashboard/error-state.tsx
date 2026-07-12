import * as React from "react";

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export function ErrorState({
  title,
  description,
}: ErrorStateProps): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 text-rose-300" />
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-rose-100/80">{description}</p>
        </div>
      </div>
    </div>
  );
}

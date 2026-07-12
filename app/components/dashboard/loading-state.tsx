import * as React from "react";

import { LoaderCircle } from "lucide-react";

export function LoadingState(): React.JSX.Element {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50">
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <LoaderCircle className="size-4 animate-spin" />
        Loading dashboard module...
      </div>
    </div>
  );
}

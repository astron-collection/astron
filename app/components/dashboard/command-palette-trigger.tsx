import * as React from "react";

import { Command } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CommandPaletteTrigger(): React.JSX.Element {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden border-slate-200 bg-white text-slate-700 hover:bg-slate-50 lg:inline-flex"
    >
      <Command className="mr-2 size-4" />
      Command Palette
      <span className="ml-3 rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-400">
        Soon
      </span>
    </Button>
  );
}

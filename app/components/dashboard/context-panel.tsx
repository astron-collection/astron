import * as React from "react";

interface ContextPanelProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function ContextPanel({
  title,
  description,
  children,
}: ContextPanelProps): React.JSX.Element {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </aside>
  );
}

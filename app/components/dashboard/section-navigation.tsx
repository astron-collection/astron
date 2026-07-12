import * as React from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { DashboardNavigationItem } from "@/types/dashboard";

interface SectionNavigationProps {
  items: DashboardNavigationItem[];
}

export function SectionNavigation({
  items,
}: SectionNavigationProps): React.JSX.Element {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
            <item.icon className="mt-0.5 size-5 text-slate-400" />
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#274a86]">
            Open route
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}

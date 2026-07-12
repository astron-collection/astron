import * as React from "react";

import { SlidersHorizontal } from "lucide-react";

import { SearchInput } from "@/components/dashboard/search-input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  placeholder: string;
  filters?: string[];
}

export function FilterBar({
  placeholder,
  filters = [],
}: FilterBarProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <SearchInput placeholder={placeholder} />
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            {filter}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          <SlidersHorizontal className="mr-2 size-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}

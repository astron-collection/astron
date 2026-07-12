import * as React from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder: string;
}

export function SearchInput({
  placeholder,
}: SearchInputProps): React.JSX.Element {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      <Input
        placeholder={placeholder}
        className="h-10 border-slate-200 bg-white pl-9 text-slate-950 placeholder:text-slate-400"
      />
    </div>
  );
}

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DashboardTableConfig } from "@/types/dashboard";

interface DataTableProps<T extends Record<string, string>> {
  config: DashboardTableConfig<T>;
}

export function DataTable<T extends Record<string, string>>({
  config,
}: DataTableProps<T>): React.JSX.Element {
  if (config.rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
        <h3 className="text-sm font-semibold text-slate-950">{config.emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{config.emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
            {config.columns.map((column) => (
              <TableHead key={column.header} className="h-11 px-4 text-slate-500">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {config.rows.map((row, index) => (
            <TableRow key={index} className="border-slate-200 hover:bg-slate-50">
              {config.columns.map((column) => (
                <TableCell key={column.header} className="px-4 py-3 text-slate-900">
                  {column.render ? column.render(row) : row[column.key as keyof typeof row]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

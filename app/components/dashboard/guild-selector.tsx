"use client";

import * as React from "react";

import { ChevronsUpDown } from "lucide-react";

import { availableGuilds } from "@/data/dashboard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GuildSelector(): React.JSX.Element {
  const [activeId, setActiveId] = React.useState(availableGuilds[0]?.id ?? "");
  const activeGuild = availableGuilds.find((guild) => guild.id === activeId) ?? availableGuilds[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="justify-between border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          <span className="truncate">{activeGuild.name}</span>
          <ChevronsUpDown className="ml-2 size-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 border-slate-200 bg-white text-slate-900"
      >
        <DropdownMenuLabel>Active Guild</DropdownMenuLabel>
        {availableGuilds.map((guild) => (
          <DropdownMenuItem
            key={guild.id}
            onClick={() => setActiveId(guild.id)}
            className="flex flex-col items-start gap-1 py-2"
          >
            <span>{guild.name}</span>
            <span className="text-xs text-slate-500">
              {guild.memberCount.toLocaleString()} members · {guild.environment}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

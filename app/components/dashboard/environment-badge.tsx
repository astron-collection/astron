import * as React from "react";

import { StatusBadge } from "@/components/dashboard/status-badge";

interface EnvironmentBadgeProps {
  environment: "Production" | "Staging" | "Sandbox";
}

export function EnvironmentBadge({
  environment,
}: EnvironmentBadgeProps): React.JSX.Element {
  const status =
    environment === "Production"
      ? "info"
      : environment === "Staging"
        ? "warning"
        : "neutral";

  return <StatusBadge status={status} label={environment} />;
}

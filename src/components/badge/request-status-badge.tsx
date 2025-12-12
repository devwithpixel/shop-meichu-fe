import { Badge } from "@/components/ui/badge";

import type { Request } from "@/types/strapi/models/request";

const statusClasses = {
  pending: "bg-orange-600 text-white",
  confirmed: "bg-green-600 text-white",
  in_progress: "bg-green-600 text-white",
  completed: "bg-green-600 text-white",
  cancelled: "bg-red-600 text-white",
} as const;

const statusStrings = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
} as const;

export function RequestStatusBadge({
  status,
}: {
  status: Request["requestStatus"];
}) {
  return (
    <div>
      <Badge className={statusClasses[status]}>{statusStrings[status]}</Badge>
    </div>
  );
}

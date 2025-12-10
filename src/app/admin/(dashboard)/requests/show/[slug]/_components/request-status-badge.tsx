import { Badge } from "@/components/ui/badge";
import { Request as RequestType } from "@/types/strapi/models/request";

const classNames: Record<RequestType["requestStatus"], string> = {
  cancelled: "bg-red-500 text-white",
  confirmed: "bg-green-500 text-white",
  in_progress: "bg-yellow-500 text-white",
  completed: "bg-green-500 text-white",
  pending: "bg-gray-500 text-white",
};

const statusReadable: Record<RequestType["requestStatus"], string> = {
  cancelled: "Cancelled",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  pending: "Pending",
};

export default function RequestStatusBadge({
  status,
}: {
  status: RequestType["requestStatus"];
}) {
  return (
    <Badge className={`${classNames[status]} text-base`}>
      {statusReadable[status]}
    </Badge>
  );
}

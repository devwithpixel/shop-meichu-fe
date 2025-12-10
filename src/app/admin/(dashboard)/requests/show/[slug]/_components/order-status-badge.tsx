import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/strapi/models/request";

const classNames: Record<Order["orderStatus"], string> = {
  cancelled: "bg-red-500 text-white",
  confirmed: "bg-green-500 text-white",
  in_progress: "bg-yellow-500 text-white",
  completed: "bg-green-500 text-white",
  pending: "bg-gray-500 text-white",
};

const statusReadable: Record<Order["orderStatus"], string> = {
  cancelled: "Cancelled",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  pending: "Pending",
};

export default function OrderStatusBadge({
  status,
}: {
  status: Order["orderStatus"];
}) {
  return (
    <Badge className={`${classNames[status]} text-base`}>
      {statusReadable[status]}
    </Badge>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { nextStepOrder, cancelOrder } from "@/lib/api/orders";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import type { Order } from "@/types/strapi/models/order";

export default function ActionButtons({ order }: { order: Order }) {
  return (
    <>
      <Button
        disabled={["cancelled", "completed"].includes(order.orderStatus)}
        className="me-3"
        onClick={async () => {
          if (["cancelled", "completed"].includes(order.orderStatus)) return;

          const result = await nextStepOrder(order.documentId);

          switch (result.type) {
            case "success":
              toast.success("Order status updated successfully");
              redirect(`/admin/orders/show/${order.documentId}`);
            case "validation":
              toast.error(result.validation.message);
              break;
            case "error":
              toast.error(result.message);
              break;
          }
        }}
      >
        Next Step
      </Button>
      <Button
        disabled={order.orderStatus !== "pending"}
        variant="destructive"
        onClick={async () => {
          if (order.orderStatus !== "pending") return;

          const result = await cancelOrder(order.documentId);

          switch (result.type) {
            case "success":
              toast.success("Order sucessfully cancelled");
              redirect(`/admin/orders/show/${order.documentId}`);
            case "validation":
              toast.error(result.validation.message);
              break;
            case "error":
              toast.error(result.message);
              break;
          }
        }}
      >
        Cancel
      </Button>
    </>
  );
}

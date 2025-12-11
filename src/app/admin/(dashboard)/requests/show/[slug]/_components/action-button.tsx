"use client";

import { Button } from "@/components/ui/button";
import { nextStepRequest, cancelRequest } from "@/lib/api/requests";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import type { Request } from "@/types/strapi/models/request";

export default function ActionButtons({ request }: { request: Request }) {
  return (
    <>
      <Button
        disabled={["cancelled", "completed"].includes(request.requestStatus)}
        className="me-3"
        onClick={async () => {
          if (["cancelled", "completed"].includes(request.requestStatus))
            return;

          const result = await nextStepRequest(request.documentId);

          switch (result.type) {
            case "success":
              toast.success("Request status updated successfully");
              redirect(`/admin/requests/show/${request.documentId}`);
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
        disabled={request.requestStatus !== "pending"}
        variant="destructive"
        onClick={async () => {
          if (request.requestStatus !== "pending") return;

          const result = await cancelRequest(request.documentId);

          switch (result.type) {
            case "success":
              toast.success("Request sucessfully cancelled");
              redirect(`/admin/requests/show/${request.documentId}`);
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

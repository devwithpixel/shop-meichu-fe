"use server";

import { fetchAdmin } from "@/actions/admin";
import { refresh } from "next/cache";

import type { ResultContract } from "@/types/api-return";

export async function nextStepOrder(
  orderId: string
): Promise<ResultContract<null>> {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/${orderId}/next-action`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  refresh();
  return { type: "success", data: null };
}

export async function cancelOrder(
  orderId: string
): Promise<ResultContract<null>> {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/${orderId}/cancel`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  refresh();
  return { type: "success", data: null };
}

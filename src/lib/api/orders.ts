"use server";

import { extendedFetchWithAuth, type ExtendedParams } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Order } from "@/types/strapi/models/request";
import type { ResultContract } from "@/types/api-return";

export async function getAllOrders(
  params?: ExtendedParams
): Promise<StrapiResponse<Order[]>> {
  const res = await extendedFetchWithAuth("/orders", params);

  return await res.json();
}

export async function getOrderData(
  documentId: string,
  params?: ExtendedParams
): Promise<StrapiResponse<Order>> {
  const res = await extendedFetchWithAuth(`/orders/${documentId}`, params);

  return await res.json();
}

export async function nextStepOrder(
  orderId: string
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(
    `/orders/${orderId}/next-action`,
    {
      init: {
        method: "POST",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}

export async function cancelOrder(
  orderId: string
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(`/orders/${orderId}/cancel`, {
    init: {
      method: "POST",
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}

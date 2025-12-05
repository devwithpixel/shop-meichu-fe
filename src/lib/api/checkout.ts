"use server";

import type { ResultContract } from "@/types/api-return";

interface CheckoutParams {
  buyerName: string;
  contact: string;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
  note?: string;
}

export async function checkout(
  params: CheckoutParams
): Promise<ResultContract<null>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
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

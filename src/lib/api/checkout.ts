import type { CartItem } from "@/types/cart";
import type { ResultContract } from "@/types/api-return";

interface CheckoutParams {
  buyerName: string;
  contact: string;
  items: CartItem[];
  note?: string;
}

export async function checkout(
  params: CheckoutParams
): Promise<ResultContract<null>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  if (!res.ok) {
    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}

"use server";

import { extendedFetch, extendedFetchWithAuth } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Subscriber } from "@/types/strapi/models/subscriber";
import type { ResultContract } from "@/types/api-return";

export async function getAllSubscribers(): Promise<
  StrapiResponse<Subscriber[]>
> {
  const response = await extendedFetchWithAuth("/subscribers", {
    init: {
      next: {
        revalidate: 0,
      },
    },
  });

  return await response.json();
}

export async function createSubscriber<T>(
  data: T
): Promise<ResultContract<Subscriber>> {
  const response = await extendedFetch("/subscribers", {
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}

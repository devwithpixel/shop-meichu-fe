"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import { updateTag } from "next/cache";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Review } from "@/types/strapi/models/review";
import type { ResultContract } from "@/types/api-return";

export async function getAllReviews(
  params?: ExtendedParams
): Promise<StrapiResponse<Review[]>> {
  const response = await extendedFetch("/reviews", {
    init: {
      next: {
        revalidate: 60,
        tags: ["reviews"],
      },
    },
    ...params,
  });

  return await response.json();
}

export async function createReview<T>(
  data: T
): Promise<ResultContract<Review>> {
  const response = await extendedFetchWithAuth("/reviews", {
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

  updateTag("subscribers");
  return { type: "success", data: await response.json() };
}

export async function deleteReview(
  documentId: string
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(`/reviews/${documentId}`, {
    init: {
      method: "DELETE",
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  updateTag("reviews");
  return { type: "success", data: null };
}

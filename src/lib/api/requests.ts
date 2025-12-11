"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Request } from "@/types/strapi/models/request";
import { ResultContract } from "@/types/api-return";

export async function getRequestData(
  documentId: string
): Promise<StrapiResponse<Request>> {
  const response = await extendedFetchWithAuth(`/requests/${documentId}`, {
    init: {
      next: {
        revalidate: 0,
      },
    },
    populate: "*",
  });

  return await response.json();
}

export async function getAllRequests(
  params?: ExtendedParams
): Promise<StrapiResponse<Request[]>> {
  const res = await extendedFetchWithAuth("/requests", {
    init: {
      next: {
        revalidate: 0,
      },
    },
    ...params,
  });

  return await res.json();
}

export async function createRequest<T>(
  data: T,
  params?: ExtendedParams
): Promise<ResultContract<null>> {
  const response = await extendedFetch("/requests", {
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    },
    ...params,
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

export async function nextStepRequest(
  requestId: string
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(
    `/requests/${requestId}/next-action`,
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

export async function cancelRequest(
  requestId: string
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(
    `/requests/${requestId}/cancel`,
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

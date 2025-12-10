"use server";

import { extendedFetchWithAuth, type ExtendedParams } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Request } from "@/types/strapi/models/request";

export async function getRequestData(
  documentId: string
): Promise<StrapiResponse<Request>> {
  const response = await extendedFetchWithAuth(`/requests/${documentId}`, {
    init: {
      next: {
        revalidate: 0,
      },
    },
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

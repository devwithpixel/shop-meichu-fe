"use server";

import { extendedFetchWithAuth } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { DashboardSummary } from "@/types/strapi/api/dashboard-summary";

export async function getDashboardSummary(): Promise<
  StrapiResponse<DashboardSummary>
> {
  const response = await extendedFetchWithAuth("/dashboard-summary", {
    init: {
      next: {
        revalidate: 0,
      },
    },
  });

  return await response.json();
}

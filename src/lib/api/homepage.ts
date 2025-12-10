"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { HomePage } from "@/types/strapi/single-type/home-page";

export async function getHomePageData(): Promise<StrapiResponse<HomePage>> {
  const response = await extendedFetch("/home-page", {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return await response.json();
}

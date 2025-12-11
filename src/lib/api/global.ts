"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Global } from "@/types/strapi/single-type/global";

export async function getGlobalData(): Promise<StrapiResponse<Global>> {
  const response = await extendedFetch("/global", {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return await response.json();
}

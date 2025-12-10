"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Footer } from "@/types/strapi/components/shared/footer";

export async function getFooterData(): Promise<StrapiResponse<Footer>> {
  const response = await extendedFetch("/global/footer", {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return await response.json();
}

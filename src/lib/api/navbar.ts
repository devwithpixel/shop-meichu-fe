"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Navbar } from "@/types/strapi/components/shared/navbar";

export async function getNavbarData(): Promise<StrapiResponse<Navbar>> {
  const response = await extendedFetch("/global/navbar", {
    init: {
      next: {
        revalidate: 3600,
      },
    },
  });

  return await response.json();
}
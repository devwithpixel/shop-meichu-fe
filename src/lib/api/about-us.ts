"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { AboutUs } from "@/types/strapi/single-type/about-us";

export async function getAboutUsData(): Promise<StrapiResponse<AboutUs>> {
  const response = await extendedFetch("/about-us", {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return await response.json();
}

"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Collection } from "@/types/strapi/single-type/collection";

export async function getCollectionData(): Promise<StrapiResponse<Collection>> {
  const response = await extendedFetch("/collection", {
    init: {
      next: {
        revalidate: 10,
      },
    },
  });

  return response.json();
}

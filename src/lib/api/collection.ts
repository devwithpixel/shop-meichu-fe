"use server";

import { StrapiResponse } from "@/types/strapi/response";
import { Collection } from "@/types/strapi/single-type/collection";

export async function getCollectionData(): Promise<StrapiResponse<Collection>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/collection`,
    {
      next: {
        revalidate: 1,
      },
    }
  );

  return response.json();
}

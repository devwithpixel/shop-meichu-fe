"use server";

import { ResultContract } from "@/types/api-return";
import { extendedFetch, extendedFetchWithAuth } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Collection } from "@/types/strapi/single-type/collection";
import { logout } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export async function getCollectionData(): Promise<StrapiResponse<Collection>> {
  const response = await extendedFetch("/collection", {
    init: {
      next: {
        revalidate: 10,
        tags: ["collection"],
      },
    },
  });

  return response.json();
}

export async function updateCollection<T>(
  data: T
): Promise<ResultContract<StrapiResponse<Collection>>> {
  const response = await extendedFetchWithAuth("/collection", {
    init: {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    if (response.status === 401) {
      await logout();
      redirect("/admin/login");
    }

    return { type: "error", message: "An error occurred" };
  }

  updateTag("collection");
  return { type: "success", data: await response.json() };
}

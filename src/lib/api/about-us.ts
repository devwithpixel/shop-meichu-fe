"use server";

import { ResultContract } from "@/types/api-return";
import { extendedFetch, extendedFetchWithAuth } from "./base";
import { logout } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

import type { StrapiResponse } from "@/types/strapi/response";
import type { AboutUs } from "@/types/strapi/single-type/about-us";

export async function getAboutUsData(): Promise<StrapiResponse<AboutUs>> {
  const response = await extendedFetch("/about-us", {
    init: {
      next: {
        revalidate: 60,
        tags: ["about-us"],
      },
    },
  });

  return await response.json();
}

export async function updateAboutUs<T>(
  data: T
): Promise<ResultContract<StrapiResponse<AboutUs>>> {
  const response = await extendedFetchWithAuth("/about-us", {
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

  updateTag("about-us");
  return { type: "success", data: await response.json() };
}

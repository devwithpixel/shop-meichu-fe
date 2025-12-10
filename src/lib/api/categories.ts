"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Category } from "@/types/strapi/models/category";
import type { ResultContract } from "@/types/api-return";

export async function getAllCategories(
  params?: ExtendedParams
): Promise<StrapiResponse<Category[]>> {
  const response = await extendedFetch("/categories", {
    init: {
      next: {
        revalidate: 10,
      },
    },
    ...params,
  });

  return response.json();
}

export async function getCategoryData(
  slug: string
): Promise<StrapiResponse<Category>> {
  const response = await extendedFetch(`/categories/${slug}`, {
    init: {
      next: {
        revalidate: 10,
      },
    },
  });

  return response.json();
}

export async function createCategory<T>(
  data: T
): Promise<ResultContract<StrapiResponse<Category>>> {
  const response = await extendedFetchWithAuth("/categories", {
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}

export async function updateCategory<T>(
  slug: string,
  data: T
): Promise<ResultContract<StrapiResponse<Category>>> {
  const response = await extendedFetchWithAuth(`/categories/${slug}`, {
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

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}

export async function deleteCategory(
  slug: string,
  params?: ExtendedParams
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(`/categories/${slug}`, {
    init: {
      method: "DELETE",
    },
    ...params,
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}

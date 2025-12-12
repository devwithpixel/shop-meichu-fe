"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import { logout } from "./auth";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
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
        tags: ["categories"],
      },
    },
    ...params,
  });

  return response.json();
}

export async function getCategoryData(
  slug: string,
  params?: ExtendedParams
): Promise<StrapiResponse<Category>> {
  const response = await extendedFetch(`/categories/${slug}`, {
    init: {
      next: {
        revalidate: 10,
        tags: ["categories"],
      },
    },
    ...params,
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

    if (response.status === 401) {
      await logout();
      redirect("/admin/login");
    }

    return { type: "error", message: "An error occurred" };
  }

  updateTag("categories");
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

    if (response.status === 401) {
      await logout();
      redirect("/admin/login");
    }

    return { type: "error", message: "An error occurred" };
  }

  updateTag("categories");
  return { type: "success", data: await response.json() };
}

export async function deleteCategory(
  slug: string,
  params?: ExtendedParams
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(
    `/categories/${slug}/soft-delete`,
    {
      init: {
        method: "DELETE",
      },
      ...params,
    }
  );

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

  updateTag("categories");
  return { type: "success", data: null };
}

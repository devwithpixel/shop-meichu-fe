"use server";

import {
  extendedFetch,
  extendedFetchWithAuth,
  type ExtendedParams,
} from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";
import type { ResultContract } from "@/types/api-return";

export async function getProductData(
  slug: string
): Promise<StrapiResponse<Product>> {
  const response = await extendedFetch(`/products/${slug}`, {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });

  return await response.json();
}

export async function getAllProducts(
  params?: ExtendedParams
): Promise<StrapiResponse<Product[]>> {
  const res = await extendedFetch("/products", {
    init: {
      next: {
        revalidate: 60 * 15,
      },
    },
    ...params,
  });
  return await res.json();
}

export async function getRecommendedProducts(): Promise<
  StrapiResponse<Product[]>
> {
  const response = await extendedFetch("/recommended-product", {
    init: {
      next: {
        revalidate: 60 * 15,
      },
    },
  });

  return await response.json();
}

export async function getProductsByCategory(
  slug: string,
  params?: ExtendedParams
): Promise<StrapiResponse<Product[]>> {
  const res = await extendedFetch(`/categories/${slug}/products`, {
    init: {
      next: {
        revalidate: 60 * 15,
      },
    },
    ...params,
  });

  return await res.json();
}

export async function deleteProduct(
  slug: string,
  params?: ExtendedParams
): Promise<ResultContract<null>> {
  const response = await extendedFetchWithAuth(`/products/${slug}`, {
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

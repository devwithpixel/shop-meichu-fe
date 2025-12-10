"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import qs from "qs";

import type { LoginResponse } from "@/types/admin/login";
import type { StrapiResponse } from "@/types/strapi/response";
import type { ResultContract } from "@/types/api-return";

interface StrapiPaginationOptions {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
}

export async function login(email: string, password: string) {
  const session = await getSession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      return { success: false, error: error.message || "Invalid credentials" };
    }

    const data: LoginResponse = await response.json();

    session.jwt = data.jwt;
    session.isLoggedIn = true;
    session.user = data.user;

    await session.save();

    return { success: true };
  } catch {
    return { success: false, error: "Network error occurred" };
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();

  redirect("/admin/login");
}

export async function fetchAdmin(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const session = await getSession();

  const mergedInit = init ?? {};
  mergedInit.headers = {
    ...mergedInit.headers,
    Authorization: `Bearer ${session.jwt}`,
  };

  const response = await fetch(input, mergedInit);

  if (response.status === 401) {
    await logout();
  }

  return response;
}

export async function getAllItem<T>(
  identifier: string,
  populate: object = {},
  pagination: StrapiPaginationOptions = {},
  sort?: object
): Promise<StrapiResponse<T[]>> {
  const params = qs.stringify({
    populate,
    pagination,
    ...(sort && { sort }),
  });

  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${identifier}?${params}`
  );

  return await response.json();
}

export async function getSpecificItem<T>(
  identifier: string,
  slug: string,
  init?: RequestInit
): Promise<StrapiResponse<T>> {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${identifier}/${slug}`,
    init
  );

  return await response.json();
}

export async function createItem<TModel>(
  identifier: string,
  data: Partial<TModel>
): Promise<ResultContract<StrapiResponse<TModel>>> {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${identifier}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}

export async function updateItem<TModel>(
  identifier: string,
  documentId: string,
  data: Partial<TModel>
): Promise<ResultContract<StrapiResponse<TModel>>> {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${identifier}/${documentId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}

export async function createImage(data: {
  file: File;
  apiName: string;
  morphId: number;
  fieldName: string;
}): Promise<ResultContract<null>> {
  const formData = new FormData();
  formData.set("files", data.file);
  formData.set("ref", data.apiName);
  formData.set("refId", data.morphId.toString());
  formData.set("field", data.fieldName);

  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}

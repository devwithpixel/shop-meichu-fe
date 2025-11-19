"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import qs from "qs";

import type { LoginResponse } from "@/types/admin/login";
import type { StrapiResponse } from "@/types/strapi/response";

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
  } catch (error) {
    return { success: false, error: "Network error occurred" };
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();

  redirect("/admin/login");
}

async function fetchAdmin(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const session = await getSession();

  const mergedInit = init ?? {};
  mergedInit.headers = {
    Authorization: `Bearer ${session.jwt}`,
  };

  return await fetch(input, mergedInit);
}

export async function getAllItem<T>(
  identifier: string,
  pagination?: StrapiPaginationOptions
): Promise<StrapiResponse<T[]>> {
  const params = qs.stringify(pagination);

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

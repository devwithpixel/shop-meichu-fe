import { getSession } from "../session";
import { logout } from "./auth";
import qs from "qs";

interface StrapiPaginationOptions {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
}

export interface ExtendedParams {
  init?: RequestInit;
  populate?: object | string;
  sort?: string[];
  filters?: object;
  pagination?: StrapiPaginationOptions;
  raiseError?: boolean;
}

export async function extendedFetch(
  input: string | URL | Request,
  params: ExtendedParams = {
    raiseError: true,
  }
) {
  const queryParams: Record<string, any> = {};

  if (params?.populate) {
    queryParams["populate"] = params.populate;
  }

  if (params?.sort) {
    queryParams["sort"] = params.sort;
  }

  if (params?.filters) {
    queryParams["filters"] = params.filters;
  }

  if (params?.pagination) {
    queryParams["pagination"] = params.pagination;
  }

  const query = qs.stringify(queryParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${input}${query ? `?${query}` : ""}`,
    params?.init
  );

  if (!response.ok && params?.raiseError) {
    throw new Error("Failed to fetch data");
  }

  return response;
}

export async function extendedFetchWithAuth(
  input: string | URL | Request,
  params?: ExtendedParams
) {
  const session = await getSession();

  const mergedInit = params?.init ?? {};
  mergedInit.headers = {
    ...mergedInit.headers,
    Authorization: `Bearer ${session.jwt}`,
  };

  params = {
    ...params,
    init: mergedInit,
  };

  const response = await extendedFetch(input, params);

  if (!response.ok && response.status === 401) {
    await logout();
  }

  return response;
}

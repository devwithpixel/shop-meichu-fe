"use client";

import { parseAsInteger, parseAsJson, useQueryStates } from "nuqs";
import { createContext, useContext, useState } from "react";

import type { ExtendedParams } from "@/lib/api/base";
import type { ResultContract } from "@/types/api-return";
import type { StrapiResponse } from "@/types/strapi/response";

interface TableActionContext<T> {
  data: T[];
  pagination: {
    pageCount: number;
    page: number;
    pageSize: number;
  };
  refresh: () => Promise<void>;
  getAction?: (params?: ExtendedParams) => Promise<StrapiResponse<T[]>>;
  deleteAction?: (
    slug: string,
    params?: ExtendedParams
  ) => Promise<ResultContract<unknown>>;
  isLoading: boolean;
}

interface TableActionProviderProps<T> {
  getAction?: (params?: ExtendedParams) => Promise<StrapiResponse<T[]>>;
  deleteAction?: (
    slug: string,
    params?: ExtendedParams
  ) => Promise<ResultContract<unknown>>;
  children?: React.ReactNode;
}

const TableActionContext = createContext<TableActionContext<any> | null>(null);

export function TableActionProvider<T>({
  getAction,
  deleteAction,
  children,
}: TableActionProviderProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    pageCount: -1,
    page: 1,
    pageSize: 1,
  });
  const [{ sort, page, perPage }] = useQueryStates({
    sort: parseAsJson<Array<{ id: string; desc: boolean }>>((value) => {
      if (
        Array.isArray(value) &&
        value.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "string" &&
            typeof item.desc === "boolean"
        )
      ) {
        return value as Array<{ id: string; desc: boolean }>;
      }
      return null;
    }).withDefault([]),
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(20),
  });

  const fetchData = async () => {
    if (!getAction) return;

    setIsLoading(true);
    const strapiSort = sort.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`);

    const result = await getAction({
      pagination: {
        page,
        pageSize: perPage,
        withCount: true,
      },
      sort: strapiSort.length > 0 ? strapiSort : undefined,
    });

    setData(result.data);
    setPagination({
      pageCount: result.meta?.pagination?.pageCount || -1,
      page: result.meta?.pagination?.page || 1,
      pageSize: result.meta?.pagination?.pageSize || 1,
    });
    setIsLoading(true);
  };

  const refresh = async () => {
    await fetchData();
  };

  return (
    <TableActionContext
      value={{
        data,
        getAction,
        deleteAction,
        pagination,
        refresh,
        isLoading,
      }}
    >
      {children}
    </TableActionContext>
  );
}

export function useTableAction<T>() {
  const context = useContext(TableActionContext);
  if (!context) {
    throw new Error("useTableAction must be used within a TableActionProvider");
  }

  return context as TableActionContext<T>;
}

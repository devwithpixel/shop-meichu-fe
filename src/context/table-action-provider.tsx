"use client";

import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  SingleParserBuilder,
  useQueryStates,
} from "nuqs";
import { createContext, useContext, useState } from "react";

import type { ExtendedParams } from "@/lib/api/base";
import type { ResultContract } from "@/types/api-return";
import type { StrapiResponse } from "@/types/strapi/response";
import { useDebounceValue } from "@/hooks/use-debounced-value";

function buildStrapiFilters(
  filters: Record<string, string>,
  filterConfig?: Record<string, string>
) {
  if (!filterConfig) return {};

  const result: Record<string, any> = {};

  for (const field in filterConfig) {
    const operator = filterConfig[field];
    const value = filters[field];

    if (!value) continue;

    result[field] = {
      [operator]: value,
    };
  }

  return result;
}

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
  isLoaded: boolean;
}

interface TableActionProviderProps<T> {
  getAction?: (params?: ExtendedParams) => Promise<StrapiResponse<T[]>>;
  deleteAction?: (
    slug: string,
    params?: ExtendedParams
  ) => Promise<ResultContract<unknown>>;
  filters?: Record<string, string>;
  children?: React.ReactNode;
}

const TableActionContext = createContext<TableActionContext<any> | null>(null);

export function TableActionProvider<T>(props: TableActionProviderProps<T>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    pageCount: -1,
    page: 1,
    pageSize: 1,
  });

  /**
   * Build Nuqs filter parsers dynamically.
   * props.filters = Record<string, string>
   * Example:
   *   { name: "$contains", category: "$eq" }
   */
  const filterQuery: Record<string, SingleParserBuilder<string>> = props.filters
    ? Object.keys(props.filters).reduce(
        (acc, field) => {
          acc[field] = parseAsString.withDefault("");
          return acc;
        },
        {} as Record<string, SingleParserBuilder<string>>
      )
    : {};

  const [{ sort, page, perPage, ...realtimeFilters }] = useQueryStates({
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
    ...filterQuery,
  });

  const debouncedFilters = useDebounceValue(realtimeFilters, 1000);

  const fetchData = async () => {
    if (!props.getAction) return;

    if (!isLoaded) {
      setIsLoaded(true);
    }
    const strapiSort = sort.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`);
    const strapiFilters = buildStrapiFilters(debouncedFilters, props.filters);

    const result = await props.getAction({
      pagination: {
        page,
        pageSize: perPage,
        withCount: true,
      },
      sort: strapiSort.length > 0 ? strapiSort : undefined,
      filters:
        Object.keys(strapiFilters).length > 0 ? strapiFilters : undefined,
    });

    setData(result.data);
    setPagination({
      pageCount: result.meta?.pagination?.pageCount || -1,
      page: result.meta?.pagination?.page || 1,
      pageSize: result.meta?.pagination?.pageSize || 1,
    });
  };

  const refresh = async () => {
    await fetchData();
  };

  return (
    <TableActionContext
      value={{
        data,
        getAction: props.getAction,
        deleteAction: props.deleteAction,
        pagination,
        refresh,
        isLoaded,
      }}
    >
      {props.children}
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

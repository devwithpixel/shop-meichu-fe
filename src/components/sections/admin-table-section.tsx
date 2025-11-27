"use client";
"use no memo";

import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDataTable } from "@/hooks/use-data-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseAsInteger, parseAsJson, useQueryStates } from "nuqs";
import { getAllItem } from "@/actions/admin";
import { deleteItem as deleteItemAdmin } from "@/actions/admin";

import type { ColumnWithDelete, ColumnWithoutDelete } from "@/types/data-table";

interface DataTableFetcherWithDelete<T> {
  columns: ColumnWithDelete<T>;
  model: string;
  populate?: object;
  enableDelete: true;
}

interface DataTableFetcherWithoutDelete<T> {
  columns: ColumnWithoutDelete<T>;
  model: string;
  populate?: object;
  enableDelete: false;
}

type DataTableFetchProps<T> =
  | DataTableFetcherWithDelete<T>
  | DataTableFetcherWithoutDelete<T>;

function useTableFetcher<T>({
  model,
  populate,
}: Pick<DataTableFetchProps<T>, "model" | "populate">) {
  const counterRef = useRef(0);
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    pageCount: -1,
    page: 1,
    pageSize: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

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

  const deleteItem = () => {
    counterRef.current++;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const strapiSort = sort.map(
          (s) => `${s.id}:${s.desc ? "desc" : "asc"}`
        );

        const result = await getAllItem<T>(
          model,
          populate,
          {
            page,
            pageSize: perPage,
            withCount: true,
          },
          strapiSort.length > 0 ? strapiSort : undefined
        );

        setData([...result.data]);
        setPagination({
          pageCount: result.meta?.pagination?.pageCount || -1,
          page: result.meta?.pagination?.page || 1,
          pageSize: result.meta?.pagination?.pageSize || 1,
        });
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sort, page, perPage, model, populate, counterRef.current]);

  return {
    data,
    pagination,
    isLoading,
    deleteItem,
  };
}

export function DataTableFetcher<T>({
  columns,
  model,
  populate,
  enableDelete,
}: DataTableFetchProps<T>) {
  "use no memo";

  const { data, pagination, isLoading, deleteItem } = useTableFetcher<T>({
    model,
    populate,
  });

  const resolvedColumns = useMemo(
    () =>
      enableDelete
        ? columns(async (identifier: string, documentId: string) => {
            const result = await deleteItemAdmin(identifier, documentId);
            if (result.type === "success") deleteItem();
          })
        : columns(),
    [enableDelete, columns, deleteItem]
  );

  const { table } = useDataTable({
    data: data,
    columns: resolvedColumns,
    pageCount: pagination.pageCount,
    initialState: {
      pagination: { pageIndex: pagination.page, pageSize: pagination.pageSize },
    },
  });

  useEffect(() => {
    table.setState((oldValue) => {
      oldValue.pagination.pageIndex = pagination.page - 1;
      oldValue.pagination.pageSize = pagination.pageSize;
      return oldValue;
    });
  }, [pagination]);

  return data.length !== 0 || !isLoading ? (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Button asChild>
          <Link href={`${model}/create`}>
            <Plus />
            Create
          </Link>
        </Button>
      </DataTableToolbar>
    </DataTable>
  ) : (
    <DataTableSkeleton columnCount={resolvedColumns.length} />
  );
}

"use client";

import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDataTable } from "@/hooks/use-data-table";
import { parseAsInteger, parseAsJson, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { getAllItem } from "@/actions/admin";

import type { StrapiPagination } from "@/types/strapi/pagination";
import type { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";

function getSortKey(sorts: { id: string; desc: boolean }[]): string {
  return sorts
    .map((s, i) => `sort[${i}][id]=${s.id}-sort[${i}][desc]=${s.desc}`)
    .join("-");
}

export function DataTableFetcher<T>({
  columns,
  model,
  populate,
}: {
  columns: ColumnDef<T>[];
  model: string;
  populate?: object;
}) {
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

  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<StrapiPagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

        setData(result.data);
        setPagination(result.meta?.pagination || null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sort, page, perPage]);

  return data.length !== 0 || !isLoading ? (
    <AdminTableSection
      key={`table-${getSortKey(sort)}-${page}-${perPage}`}
      data={data}
      columns={columns}
      pagination={pagination!}
      models="products"
    />
  ) : (
    <Skeleton className="w-full h-96" />
  );
}

export default function AdminTableSection<T>({
  data,
  columns,
  pagination,
  models,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: StrapiPagination;
  models: string;
}) {
  const { table } = useDataTable({
    data,
    columns,
    pageCount: pagination.pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }] as any,
      pagination: { pageIndex: pagination.page, pageSize: pagination.pageSize },
    },
    getRowId: (row) => (row as any).id,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Button asChild>
          <Link href={`${models}/create`}>
            <Plus />
            Create
          </Link>
        </Button>
      </DataTableToolbar>
    </DataTable>
  );
}

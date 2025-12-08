"use client";

import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDataTable } from "@/hooks/use-data-table";
import { useEffect } from "react";
import { useTableAction } from "@/context/table-action-provider";
import type { ColumnDef } from "@tanstack/react-table";

interface TableProps<T> {
  routes?: {
    create?: string;
  };
  columns: ColumnDef<T>[];
}

export function AdminTable<T>({ routes, columns }: TableProps<T>) {
  "use no memo";
  const { data, pagination, refresh, isLoading } = useTableAction<T>();

  const { table } = useDataTable({
    data: data,
    columns: columns,
    pageCount: pagination.pageCount,
    initialState: {
      pagination: { pageIndex: pagination.page, pageSize: pagination.pageSize },
    },
  });

  useEffect(() => {
    refresh();
  }, [refresh]);

  return data.length !== 0 || !isLoading ? (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        {routes?.create && (
          <Button asChild>
            <Link href={routes.create}>
              <Plus />
              Create
            </Link>
          </Button>
        )}
      </DataTableToolbar>
    </DataTable>
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
}

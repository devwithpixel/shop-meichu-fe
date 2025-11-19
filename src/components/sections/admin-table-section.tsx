"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { ColumnDef } from "@tanstack/react-table";

export default function AdminTableSection<T>({
  data,
  columns,
  pageCount,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  pageCount: number;
}) {
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}

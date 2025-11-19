"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/types/strapi/models/category";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const categoriesColumn: ColumnDef<Category>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
];

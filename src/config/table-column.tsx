"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnWithDelete } from "@/types/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "@/components/global/image";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";
import type { StrapiImage } from "@/types/strapi/media/image";
import { Order } from "@/types/strapi/models/order";
import { cancelOrder, nextStepOrder } from "@/lib/api/admin/order";
import { refresh } from "next/cache";
import toast from "react-hot-toast";

const orderStatus = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function ActionMenu<T extends { documentId: string; slug?: string }>({
  model,
  row,
  deleteAction,
}: {
  model: string;
  row: Row<T>;
  deleteAction: (identifier: string, documentId: string) => Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-gray-800 text-white">
        <DropdownMenuItem asChild>
          <Link
            href={`/admin/${model}/edit/${row.original?.slug || row.original.documentId}`}
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => deleteAction(model, row.original.documentId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const categoriesColumn: ColumnWithDelete<Category> = (
  deleteAction: (identifier: string, documentId: string) => Promise<void>
): ColumnDef<Category>[] => {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="ID" />
      ),
      enableColumnFilter: true,
      size: 12,
      meta: {
        label: "ID",
      },
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableColumnFilter: true,
      meta: {
        label: "Name",
      },
    },
    {
      id: "slug",
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Slug" />
      ),
      enableColumnFilter: true,
      meta: {
        label: "Slug",
      },
    },
    {
      id: "products",
      accessorKey: "products",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Total Products" />
      ),
      cell: ({ row }) => {
        const products = row.getValue("products") as {
          count: number;
        };
        return <div>{products.count}</div>;
      },
      enableColumnFilter: true,
      meta: {
        label: "Total Products",
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu model="categories" row={row} deleteAction={deleteAction} />
      ),
      size: 32,
      meta: {
        label: "Actions",
      },
    },
  ];
};

export const productsColumn: ColumnWithDelete<Product> = (
  deleteAction: (identifier: string, documentId: string) => Promise<void>
): ColumnDef<Product>[] => {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="ID" />
      ),
      enableColumnFilter: true,
      meta: {
        label: "ID",
      },
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableColumnFilter: true,
      meta: {
        label: "Name",
      },
    },
    {
      id: "price",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Price" />
      ),
      cell: ({ row }) => <div>{formatCurrency(row.getValue("price"))}</div>,
      enableColumnFilter: true,
      meta: {
        label: "Price",
      },
    },
    {
      id: "sold",
      accessorKey: "sold",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Sold" />
      ),
      cell: ({ row }) => <div>{row.getValue("sold") as number}</div>,
      enableColumnFilter: true,
      meta: {
        label: "Sold",
      },
    },
    {
      id: "stock",
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Stock" />
      ),
      cell: ({ row }) => (
        <div>{(row.getValue("stock") as number).toLocaleString()}</div>
      ),
      enableColumnFilter: true,
      meta: {
        label: "Stock",
      },
    },
    {
      id: "images",
      accessorKey: "images",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Image" />
      ),
      cell: ({ row }) => {
        const images = row.getValue("images") as StrapiImage[];

        return images ? (
          <Image
            className="size-12 object-contain rounded-4"
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${images?.[0].formats?.thumbnail?.url ?? images?.[0].url}`}
          />
        ) : null;
      },
      enableSorting: false,
      enableColumnFilter: false,
      meta: {
        label: "Image",
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu model="products" row={row} deleteAction={deleteAction} />
      ),
      size: 32,
      meta: {
        label: "Actions",
      },
    },
  ];
};

export const orderColumn = (): ColumnDef<Order>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="ID" />
    ),
    enableColumnFilter: true,
    meta: {
      label: "ID",
    },
  },
  {
    id: "buyerName",
    accessorKey: "buyerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Buyer Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("buyerName")}</div>,
    enableColumnFilter: true,
    meta: {
      label: "Buyer Name",
    },
  },
  {
    id: "contact",
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Contact" />
    ),
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
    enableColumnFilter: true,
    meta: {
      label: "Contact",
    },
  },
  {
    id: "totalPrice",
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Total Price" />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue("totalPrice"))}</div>,
    enableColumnFilter: true,
    meta: {
      label: "Total Price",
    },
  },
  {
    id: "orderStatus",
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Order Status" />
    ),
    cell: ({ row }) => (
      <div>{(orderStatus as any)[row.getValue("orderStatus") as any]}</div>
    ),
    enableColumnFilter: true,
    meta: {
      label: "Order Status",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-gray-800 text-white">
          <DropdownMenuItem asChild>
            <Link href={`/admin/orders/show/${row.original.documentId}`}>
              View Items
            </Link>
          </DropdownMenuItem>
          {!["cancelled", "completed"].includes(
            row.getValue("orderStatus")
          ) && (
            <DropdownMenuItem
              onClick={async () => {
                const result = await nextStepOrder(row.original.documentId);

                switch (result.type) {
                  case "success":
                    toast.success("Order status updated successfully");
                    break;
                  case "validation":
                    toast.error(result.validation.message);
                    break;
                  case "error":
                    toast.error(result.message);
                    break;
                }
              }}
            >
              Next Step
            </DropdownMenuItem>
          )}

          {row.getValue("orderStatus") === "pending" && (
            <DropdownMenuItem
              onClick={async () => {
                const result = await cancelOrder(row.original.documentId);

                switch (result.type) {
                  case "success":
                    toast.success("Order status updated successfully");
                    break;
                  case "validation":
                    toast.error(result.validation.message);
                    break;
                  case "error":
                    toast.error(result.message);
                    break;
                }
              }}
            >
              Cancel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 32,
    meta: {
      label: "Actions",
    },
  },
];

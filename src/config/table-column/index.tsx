"use client";

import { useTableAction } from "@/context/table-action-provider";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  CheckCheckIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  MoreHorizontal,
  PencilIcon,
  PhoneIcon,
  TextIcon,
  XIcon,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { cancelRequest, nextStepRequest } from "@/lib/api/requests";
import { RequestStatusBadge } from "@/components/badge/request-status-badge";
import toast from "react-hot-toast";
import Link from "next/link";
import StrapiImage from "@/components/global/strapi-image";

import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";
import type { Subscriber } from "@/types/strapi/models/subscriber";
import type { Request } from "@/types/strapi/models/request";
import type { StrapiImage as StrapiImageType } from "@/types/strapi/media/image";
import type { StrapiRelationCount } from "@/types/strapi/count-relation";
import { ContactPlatformBadge } from "@/components/badge/contact-platform-badge";
import { formatDateTime } from "@/lib/format";

export const categoriesColumn: ColumnDef<Category>[] = [
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
      placeholder: "Search name...",
      variant: "text",
      icon: TextIcon,
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
    enableSorting: false,
    meta: {
      label: "Total Products",
    },
  },
  {
    id: "thumbnail",
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Thumbnail" />
    ),
    cell: ({ row }) => (
      <StrapiImage
        className="size-12 object-cover rounded-lg"
        src={row.getValue("thumbnail") as StrapiImageType}
        size="thumbnail"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      label: "Thumbnail",
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => formatDateTime(getValue<string>()),
    enableSorting: true,
    enableColumnFilter: false,
    meta: {
      label: "Created At",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { deleteAction, refresh } = useTableAction();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/categories/show/${row.original.slug}`}>
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/categories/edit/${row.original.slug}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            {deleteAction && (
              <DropdownMenuItem
                disabled={
                  (row.original.products as StrapiRelationCount).count > 0
                }
                variant="destructive"
                onClick={async () => {
                  const result = await deleteAction(row.original.slug);

                  switch (result.type) {
                    case "success":
                      toast.success("Category deleted successfully");
                      refresh();
                      break;
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 32,
    meta: {
      label: "Actions",
    },
  },
];

export const productsColumn: ColumnDef<Product>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="ID" />
    ),
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
      placeholder: "Search name...",
      variant: "text",
      icon: TextIcon,
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Price" />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue("price"))}</div>,
    meta: {
      label: "Price",
    },
  },
  {
    id: "images",
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Image" />
    ),
    cell: ({ row }) => {
      const images = row.getValue("images") as StrapiImageType[];

      return images ? (
        <StrapiImage
          className="size-12 object-cover rounded-lg"
          src={images?.[0]}
          size="thumbnail"
        />
      ) : null;
    },
    enableSorting: false,
    meta: {
      label: "Image",
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => formatDateTime(getValue<string>()),
    enableSorting: true,
    enableColumnFilter: false,
    meta: {
      label: "Created At",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { deleteAction, refresh } = useTableAction();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/edit/${row.original.slug}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            {deleteAction && (
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  const result = await deleteAction(row.original.slug);

                  switch (result.type) {
                    case "success":
                      toast.success("Product deleted successfully");
                      refresh();
                      break;
                    default:
                      toast.error("Failed to delete product");
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const requestsColumn: ColumnDef<Request>[] = [
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
      placeholder: "Search buyer name...",
      variant: "text",
      icon: TextIcon,
    },
  },
  {
    id: "contactPlatform",
    accessorKey: "contactPlatform",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Contact Platform" />
    ),
    cell: ({ row }) => (
      <ContactPlatformBadge
        platform={row.getValue("contactPlatform")}
        variant="border"
      />
    ),
    enableColumnFilter: true,
    meta: {
      label: "Contact Platform",
      variant: "multiSelect",
      options: [
        { label: "Facebook", value: "facebook", icon: FaFacebook },
        { label: "Instagram", value: "instagram", icon: FaInstagram },
        { label: "Email", value: "email", icon: MailIcon },
        { label: "Whatsapp", value: "whatsapp", icon: FaWhatsapp },
      ],
    },
  },
  {
    id: "contact",
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Contact" />
    ),
    cell: ({ row }) => <p className="truncate">{row.getValue("contact")}</p>,
    enableColumnFilter: true,
    meta: {
      label: "Contact",
      placeholder: "Search contact...",
      variant: "text",
      icon: PhoneIcon,
    },
  },
  {
    id: "requestStatus",
    accessorKey: "requestStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Request Status" />
    ),
    cell: ({ row }) => (
      <RequestStatusBadge
        variant="border"
        status={row.getValue("requestStatus") as Request["requestStatus"]}
      />
    ),
    enableColumnFilter: true,
    meta: {
      label: "Request Status",
      variant: "multiSelect",
      options: [
        { label: "Pending", value: "pending", icon: ClockIcon },
        { label: "Confirmed", value: "confirmed", icon: CheckIcon },
        { label: "In Progress", value: "in_progress", icon: PencilIcon },
        { label: "Completed", value: "completed", icon: CheckCheckIcon },
        { label: "Cancelled", value: "cancelled", icon: XIcon },
      ],
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => formatDateTime(getValue<string>()),
    enableSorting: true,
    enableColumnFilter: false,
    meta: {
      label: "Created At",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { refresh } = useTableAction();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/requests/show/${row.original.documentId}`}>
                View Items
              </Link>
            </DropdownMenuItem>
            {!["cancelled", "completed"].includes(
              row.getValue("requestStatus")
            ) && (
              <DropdownMenuItem
                onClick={async () => {
                  const result = await nextStepRequest(row.original.documentId);

                  switch (result.type) {
                    case "success":
                      toast.success("Request status updated successfully");
                      refresh();
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

            {row.getValue("requestStatus") === "pending" && (
              <DropdownMenuItem
                className="text-red-500"
                onClick={async () => {
                  const result = await cancelRequest(row.original.documentId);

                  switch (result.type) {
                    case "success":
                      toast.success("Request sucessfully cancelled");
                      refresh();
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
      );
    },
    size: 32,
    meta: {
      label: "Actions",
    },
  },
];

export const subscribersColumn: ColumnDef<Subscriber>[] = [
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
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Email" />
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
    enableColumnFilter: true,
    meta: {
      label: "Email",
      placeholder: "Search email...",
      variant: "text",
      icon: TextIcon,
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => formatDateTime(getValue<string>()),
    enableSorting: true,
    enableColumnFilter: false,
    meta: {
      label: "Created At",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { deleteAction, refresh } = useTableAction();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {deleteAction && (
              <DropdownMenuItem
                className="text-red-500"
                onClick={async () => {
                  const result = await deleteAction(row.original.documentId);

                  switch (result.type) {
                    case "success":
                      toast.success("Subscriber sucessfully deleted");
                      refresh();
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
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 32,
    meta: {
      label: "Actions",
    },
  },
];

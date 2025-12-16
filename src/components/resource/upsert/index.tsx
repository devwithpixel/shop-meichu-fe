"use client";

import { createContext, useContext, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import type { ExtendedParams } from "@/lib/api/base";
import type { ResultContract } from "@/types/api-return";

interface UpsertActionType {
  delete: {
    action: (
      slug: string,
      params?: ExtendedParams
    ) => Promise<ResultContract<unknown>>;
    id: string;
  };
}

interface UpsertContextType {
  type: "create" | "update" | "show";
  resourceUrl: string;
  model: {
    plural: string;
    singular: string;
  };
  title?: string;
  action?: UpsertActionType;
}

const UpsertContext = createContext<UpsertContextType | null>(null);

export function UpsertProvider({
  children,
  type,
  resourceUrl,
  model,
  title,
  action,
}: {
  children: React.ReactNode;
  type: "create" | "update" | "show";
  resourceUrl: string;
  model: {
    plural: string;
    singular: string;
  };
  title?: string;
  action?: UpsertActionType;
}) {
  return (
    <UpsertContext.Provider value={{ type, resourceUrl, model, title, action }}>
      {children}
    </UpsertContext.Provider>
  );
}

export function UpsertBreadcrumb() {
  const context = useContext(UpsertContext);

  if (!context) {
    return null;
  }

  const { type, resourceUrl, model, title } = context;

  const breadcrumbTitle = useMemo(() => {
    switch (type) {
      case "create":
        return "Create";
      case "update":
        return "Edit";
      case "show":
        return "View";
    }
  }, [type]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={resourceUrl}>{model.plural}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        {type !== "create" && title && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>{title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function UpsertToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center items-start justify-between mb-9">
      {children}
    </div>
  );
}

export function UpsertHeader({ className }: { className?: string }) {
  const context = useContext(UpsertContext);

  if (!context) {
    return null;
  }

  const { type, title, model } = context;

  const headerTitle = useMemo(() => {
    switch (type) {
      case "create":
        return "Create";
      case "update":
        return "Edit";
      case "show":
        return "View";
    }
  }, [type]);

  return (
    <h1 className={cn("text-3xl font-semibold tracking-tight", className)}>
      {headerTitle} {type === "create" || !title ? model.plural : title}
    </h1>
  );
}

export function UpsertActions({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-3">{children}</div>;
}

export function DeleteAction({
  action,
  id,
  ...props
}: {
  action: (
    slug: string,
    params?: ExtendedParams
  ) => Promise<ResultContract<unknown>>;
  id: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(UpsertContext);

  if (!context) {
    return null;
  }

  const { resourceUrl, model } = context;

  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const result = await action(id);

        switch (result.type) {
          case "success":
            toast.success(`${model.singular} deleted successfully`);
            redirect(resourceUrl);
          default:
            toast.error(`Failed to delete ${model.singular.toLowerCase()}`);
        }
      }}
      {...props}
    >
      Delete
    </Button>
  );
}

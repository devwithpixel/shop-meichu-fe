import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface BreadcrumbProps {
  type: "create" | "update" | "show";
  modelRoute: string;
  modelName: string;
  title?: string;
}

export default function AdminBreadcrumb({
  type,
  modelRoute,
  modelName,
  title,
}: BreadcrumbProps) {
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
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={modelRoute}>{modelName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        {type !== "create" && (
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

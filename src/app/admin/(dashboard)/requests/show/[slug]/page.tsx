import { getRequestData } from "@/lib/api/requests";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import RequestStatusBadge from "./_components/request-status-badge";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getRequestData(slug);

  return (
    <>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/orders">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/admin/orders/show/${data.documentId}`}>
                {data.buyerName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>View</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-medium mb-5">View {data.buyerName}</h1>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <h2 className="text-lg font-medium mb-2">Buyer Name</h2>
              <Input value={data.buyerName} type="text" readOnly />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Contact</h2>
              <Input value={data.contact} type="text" readOnly />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Status</h2>
              <RequestStatusBadge status={data.requestStatus} />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Note</h2>
              <Textarea value={data.note || "No note specified"} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

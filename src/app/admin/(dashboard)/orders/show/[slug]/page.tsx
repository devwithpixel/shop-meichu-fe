import { getOrderData } from "@/lib/api/orders";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import OrderItemCard from "./_components/order-item-card";
import OrderStatusBadge from "./_components/order-status-badge";
import ActionButtons from "./_components/action-buttons";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getOrderData(slug);

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
              <OrderStatusBadge status={data.orderStatus} />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Note</h2>
              <Textarea value={data.note || "No note specified"} readOnly />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.items.map((item) => (
              <OrderItemCard
                key={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <ActionButtons order={data} />
        </CardFooter>
      </Card>
    </>
  );
}

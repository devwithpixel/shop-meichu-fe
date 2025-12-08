import { getSpecificItem } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Order } from "@/types/strapi/models/order";
import OrderItemCard from "./_components/order-item-card";
import { Input } from "@/components/ui/input";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Order>("orders", slug);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-medium mb-2">Buyer Name</h2>
          <Input value={data.buyerName} type="text" disabled />
          <h2 className="text-lg font-medium mb-2">Contact</h2>
          <Input value={data.contact} type="text" disabled />
          <h2 className="text-lg font-medium mb-2">Note</h2>
          <p className="mb-5 text-sm">{data.note || "No note specified"}</p>
          <h2 className="text-lg font-medium mb-2">Items</h2>
          {data.items.map((item) => (
            <OrderItemCard
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
}

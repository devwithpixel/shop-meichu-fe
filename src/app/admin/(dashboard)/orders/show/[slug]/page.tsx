import { getSpecificItem } from "@/actions/admin";
import ProductCard from "@/components/card/product-card";

import type { Order } from "@/types/strapi/models/order";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Order>("orders", slug);

  return (
    <div>
      <h2 className="text-lg font-medium">Buyer Name</h2>
      <p className="mb-5">{data.buyerName}</p>
      <h2 className="text-lg font-medium">Contact</h2>
      <p className="mb-5">{data.contact}</p>
      <h2 className="text-lg font-medium">Note</h2>
      <p className="mb-5">{data.note || "No note specified"}</p>
      <h2 className="text-lg font-medium">Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.items.map((item) => (
          <ProductCard product={item.product} />
        ))}
      </div>
    </div>
  );
}

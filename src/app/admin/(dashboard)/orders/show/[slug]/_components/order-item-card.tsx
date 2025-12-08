import { Product } from "@/types/strapi/models/product";
import { Card, CardContent } from "@/components/ui/card";
import StrapiImage from "@/components/global/strapi-image";

export default function OrderItemCard({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <Card className="">
      <CardContent className="flex w-full items-center gap-5">
        <StrapiImage
          src={product.images?.[0]}
          alt={product.name}
          size="small"
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p>{quantity}</p>
        </div>
      </CardContent>
    </Card>
  );
}

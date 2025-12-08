import { Product } from "@/types/strapi/models/product";
import { Card, CardContent } from "@/components/ui/card";
import StrapiImage from "@/components/global/strapi-image";
import { formatCurrency } from "@/lib/utils";

export default function OrderItemCard({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <Card className="p-2">
      <CardContent className="flex w-full items-center gap-5 px-0">
        <StrapiImage
          src={product.images?.[0]}
          alt={product.name}
          size="small"
          className="w-16 h-16 rounded-lg"
        />
        <div className="flex justify-between w-full">
          <div className="w-full">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-xs">
              {formatCurrency(product.price * quantity)}
            </p>
          </div>
          <p className="text-right">x{quantity}</p>
        </div>
      </CardContent>
    </Card>
  );
}

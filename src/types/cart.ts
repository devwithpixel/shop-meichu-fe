import type { Product } from "@/types/strapi/models/product";

export type CartItem = Pick<
  Product,
  "id" | "slug" | "name" | "price" | "stock" | "images"
> & {
  quantity: number;
};

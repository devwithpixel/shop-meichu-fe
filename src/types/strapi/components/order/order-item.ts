import type { Product } from "@/types/strapi/models/product";

export interface OrderItem {
  id: number;
  product: Product;
  count: number;
}

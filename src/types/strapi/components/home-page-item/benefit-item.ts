import type { Product } from "@/types/strapi/models/product";

export interface BenefitItem {
  id: number;
  badge: string;
  product?: Product;
}

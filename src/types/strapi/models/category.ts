import type { StrapiTimestamp } from "@/types/strapi/timestamp";
import type { Product } from "./product";

export interface Category extends StrapiTimestamp {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  products?:
    | {
        count: number;
      }
    | Product[];
}

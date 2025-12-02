import type { StrapiTimestamp } from "@/types/strapi/timestamp";
import type { Product } from "./product";
import type { StrapiImage } from "@/types/strapi/media/image";

export interface Category extends StrapiTimestamp {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  thumbnail?: StrapiImage;
  products?:
    | {
        count: number;
      }
    | Product[];
}

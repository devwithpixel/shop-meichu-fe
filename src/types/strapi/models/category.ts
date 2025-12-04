import type { BaseModel } from "@/types/strapi/models/base-model";
import type { Product } from "./product";
import type { StrapiImage } from "@/types/strapi/media/image";

export interface Category extends BaseModel {
  name: string;
  slug: string;
  thumbnail?: StrapiImage;
  products?:
    | {
        count: number;
      }
    | Product[];
}

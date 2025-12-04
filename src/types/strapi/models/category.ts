import type { BaseModel } from "@/types/strapi/models/base-model";
import type { Product } from "./product";
import type { StrapiImage } from "@/types/strapi/media/image";
import type { Heading } from "@/types/strapi/components/shared/heading";

export interface Category extends BaseModel {
  name: string;
  slug: string;
  thumbnail?: StrapiImage;
  heading?: Heading;
  backgroundColor: string;
  products?:
    | {
        count: number;
      }
    | Product[];
}

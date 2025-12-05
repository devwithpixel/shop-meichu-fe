import type { BaseModel } from "@/types/strapi/models/base-model";
import type { StrapiImage } from "@/types/strapi/media/image";
import type { Category } from "./category";

export interface  Product extends BaseModel {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images?: StrapiImage[];
  category?: Category;
}

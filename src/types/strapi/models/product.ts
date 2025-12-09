import type { BaseModel } from "@/types/strapi/models/base-model";
import type { StrapiImage } from "@/types/strapi/media/image";
import type { Category } from "./category";
import type { Field } from "@/types/strapi/components/shared/field";

export interface Product extends BaseModel {
  name: string;
  slug: string;
  fields: Field[];
  backgroundColor: string;
  price: number;
  origin: string;
  images?: StrapiImage[];
  category?: Category;
}

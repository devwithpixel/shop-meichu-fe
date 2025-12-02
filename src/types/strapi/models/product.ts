import { StrapiTimestamp } from "@/types/strapi/timestamp";
import { StrapiImage } from "@/types/strapi/media/image";
import { Category } from "./category";

export interface Product extends StrapiTimestamp {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images?: StrapiImage[];
  category?: Category;
}

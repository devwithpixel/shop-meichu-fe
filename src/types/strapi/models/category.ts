import { StrapiTimestamp } from "@/types/strapi/timestamp";

export interface Category extends StrapiTimestamp {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

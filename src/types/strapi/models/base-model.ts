import type { StrapiTimestamp } from "@/types/strapi/timestamp";

export interface BaseModel extends StrapiTimestamp {
  id: number;
  documentId: string;
}

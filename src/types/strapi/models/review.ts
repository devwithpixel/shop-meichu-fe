import { StrapiImage } from "@/types/strapi/media/image";

export interface Review {
  id: number;
  documentId: string;
  review: string;
  avatar: StrapiImage;
  name: string;
  location?: string;
}

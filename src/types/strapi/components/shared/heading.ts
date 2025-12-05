import type { StrapiImage } from "@/types/strapi/media/image";

export interface Heading {
  id: number;
  title: string;
  description: string;
  thumbnail?: StrapiImage;
}

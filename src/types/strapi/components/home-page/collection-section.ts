import type { Collection } from "@/types/strapi/components/home-page-item/collection";
import type { BaseSection } from "@/types/strapi/components/shared/base-section";

export interface CollectionSection {
  id: number;
  collections: Collection[];
  section: BaseSection;
}

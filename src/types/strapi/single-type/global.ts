import type { StrapiImage } from "@/types/strapi/media/image";
import type { Footer } from "@/types/strapi/components/shared/footer";
import type { Navbar } from "@/types/strapi/components/shared/navbar";

export interface SiteInfo {
  siteName: string;
  siteDescription?: string;
  favicon: StrapiImage;
}

export type Global = SiteInfo & {
  footer?: Footer;
  navbar?: Navbar;
};

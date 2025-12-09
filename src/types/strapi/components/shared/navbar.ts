import type { Brand } from "./brand";
import type { Navigation } from "./navigation";

export interface Navbar {
  brand?: Brand;
  navigations: Navigation[];
}

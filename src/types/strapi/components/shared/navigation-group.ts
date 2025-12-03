import type { Navigation } from "./navigation";

export interface NavigationGroup {
  id: number;
  title: string;
  navigations?: Navigation[];
}

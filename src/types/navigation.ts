export interface SingleSubNavigation {
  type: "single";
  items: {
    title: string;
    url: string;
  }[];
}

export interface GroupedSubNavigation {
  type: "grouped";
  items?: {
    title: string;
    items: {
      title: string;
      url: string;
    }[];
  }[];
}

export interface Navigation {
  title: string;
  url?: string;
  subNavigation?: SingleSubNavigation | GroupedSubNavigation;
}

export interface SidebarSubNavigationProps {
  title: string;
  href: string;
  icon?: React.ElementType;
}

export interface SidebarNavigationGroupProps {
  title: string;
  items: SidebarSubNavigationProps[];
}

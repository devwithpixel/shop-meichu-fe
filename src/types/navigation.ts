// navabr-link
export interface Subcategory {
    title: string;
    href: string;
}

export interface Category {
    title: string;
    href: string;
    subcategories?: Subcategory[];
}

export interface NavItem {
    title: string;
    href: string;
}

export interface NavLink {
    text: string;
    href?: string;
    items?: NavItem[];
    categories?: Category[];
    isDropdown?: boolean;
}

export interface BottomNavItem {
    href: string;
    icon: string;
    label: string;
}
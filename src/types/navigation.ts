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

// Search
export interface RecentSearch {
    id: number;
    text: string;
}

export interface Collection {
    id: number;
    name: string;
    href: string;
}

export interface ProductColor {
    label: string;
    bgImg: string;
    bgColor: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    images: {
        front: string;
        hover: string;
    };
    sizes: string[];
    colors: ProductColor[];
}

import { BottomNavItem, Category, NavItem, NavLink, } from "@/types/navigation";

export const homeItems: NavItem[] = [
    { title: "Home 1", href: "/" },
    { title: "Home 2", href: "/home-2" },
    { title: "Home 3", href: "/home-3" },
];

export const catalogItems: NavItem[] = [
    { title: "All Products", href: "/catalog" },
    { title: "New Arrivals", href: "/catalog/new-arrivals" },
    { title: "Best Sellers", href: "/catalog/best-sellers" },
    { title: "Sale", href: "/catalog/sale" },
];

export const homeCategories: Category[] = [
    {
        title: "SUMMER ESSENTIALS",
        href: "/collections/summer",
        subcategories: [
            { title: "Summer Dresses", href: "/collections/summer/dresses" },
            { title: "Beachwear", href: "/collections/summer/beachwear" },
            { title: "Sandals & Slides", href: "/collections/summer/footwear" },
            { title: "Sun Hats", href: "/collections/summer/accessories" },
        ],
    },
    {
        title: "FALL COLLECTION",
        href: "/collections/fall",
        subcategories: [
            { title: "Sweaters & Cardigans", href: "/collections/fall/sweaters" },
            { title: "Coats & Jackets", href: "/collections/fall/outerwear" },
            { title: "Boots", href: "/collections/fall/boots" },
            { title: "Scarves", href: "/collections/fall/scarves" },
        ],
    },
    {
        title: "CASUAL WEAR",
        href: "/collections/casual",
        subcategories: [
            { title: "T-Shirts & Tops", href: "/collections/casual/tops" },
            { title: "Jeans & Denim", href: "/collections/casual/denim" },
            { title: "Sneakers", href: "/collections/casual/sneakers" },
            { title: "Bags", href: "/collections/casual/bags" },
        ],
    },
    {
        title: "FORMAL ATTIRE",
        href: "/collections/formal",
        subcategories: [
            { title: "Blazers & Suits", href: "/collections/formal/blazers" },
            { title: "Dress Shirts", href: "/collections/formal/shirts" },
            { title: "Dress Shoes", href: "/collections/formal/shoes" },
            { title: "Ties & Accessories", href: "/collections/formal/accessories" },
        ],
    },
];

export const catalogCategories: Category[] = [
    { title: "WOMEN'S CLOTHING", href: "/catalog/women" },
    { title: "MEN'S CLOTHING", href: "/catalog/men" },
    { title: "SHOES & FOOTWEAR", href: "/catalog/shoes" },
    { title: "ACCESSORIES", href: "/catalog/accessories" },
    { title: "BAGS & WALLETS", href: "/catalog/bags" },
    { title: "JEWELRY", href: "/catalog/jewelry" },
    { title: "SPORTSWEAR", href: "/catalog/sportswear" },
    { title: "OUTERWEAR", href: "/catalog/outerwear" },
];

export const navLinks: NavLink[] = [
    {
        text: "Home",
        items: homeItems,
        isDropdown: true,
        categories: homeCategories,
    },
    {
        text: "Catalog",
        items: catalogItems,
        isDropdown: true,
        categories: catalogCategories,
    },
    { text: "About", href: "/about" },
    { text: "Blogs", href: "/blogs" },
    { text: "Privacy", href: "/privacy" },
];

export const bottomNavItems: BottomNavItem[] = [
    { href: "/collections/1", icon: "Package", label: "Shop" },
    { href: "/", icon: "Home", label: "Home" },
    { href: "/auth/login", icon: "User", label: "Account" },
];

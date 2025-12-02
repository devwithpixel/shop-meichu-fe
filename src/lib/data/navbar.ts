import { BottomNavItem, Category, Collection, NavItem, NavLink, Product, RecentSearch } from "@/types/navigation";

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
    { href: "/", icon: "Home", label: "Home" },
    { href: "/menu", icon: "Grid3x3", label: "Menu" },
    { href: "/search", icon: "Search", label: "Search" },
    { href: "/shop", icon: "Package", label: "Shop" },
    { href: "/account", icon: "User", label: "Account" },
    { href: "/cart", icon: "ShoppingCart", label: "Cart" },
];

// saerch
export const popularCollections: Collection[] = [
    {
        id: 1,
        name: "Sneakers Collection",
        href: "#",
    },
    {
        id: 2,
        name: "Running Essentials",
        href: "#",
    },
    {
        id: 3,
        name: "Formal Wear",
        href: "#",
    },
    {
        id: 4,
        name: "Casual Comfort",
        href: "#",
    },
    {
        id: 5,
        name: "Sports Performance",
        href: "#",
    },
    {
        id: 6,
        name: "Outdoor Adventure",
        href: "#",
    },
    {
        id: 7,
        name: "Limited Edition",
        href: "#",
    },
    {
        id: 8,
        name: "Eco-Friendly Line",
        href: "#",
    },
    {
        id: 9,
        name: "Summer Vibes",
        href: "#",
    },
    {
        id: 10,
        name: "Summer Vibes",
        href: "#",
    },
    {
        id: 11,
        name: "Summer Vibes",
        href: "#",
    },
    {
        id: 12,
        name: "Summer Vibes",
        href: "#",
    },
];

export const initialRecentSearches: RecentSearch[] = [
    { id: 1, text: "White Sneakers" }
];

export const sampleProducts: Product[] = [
    {
        id: 1,
        title: "Classic White Sneakers",
        price: 129,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["38", "39", "40", "41", "42"],
        colors: [
            {
                label: "White",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-white",
            },
            {
                label: "Black",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-black",
            },
        ],
    },
    {
        id: 2,
        title: "Running Shoes Pro",
        price: 159,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["40", "41", "42", "43", "44"],
        colors: [
            {
                label: "Blue",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-blue-500",
            },
            {
                label: "Red",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-red-500",
            },
        ],
    },
    {
        id: 3,
        title: "Casual Loafers",
        price: 89,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["39", "40", "41", "42"],
        colors: [
            {
                label: "Brown",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-amber-800",
            },
            {
                label: "Navy",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-blue-800",
            },
        ],
    },
    {
        id: 4,
        title: "Basketball Shoes",
        price: 149,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["40", "41", "42", "43"],
        colors: [
            {
                label: "Red",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-red-600",
            },
        ],
    },
    {
        id: 5,
        title: "Hiking Boots",
        price: 199,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["41", "42", "43", "44"],
        colors: [
            {
                label: "Green",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-green-700",
            },
        ],
    },
    {
        id: 6,
        title: "Formal Shoes",
        price: 179,
        images: {
            front: "./assets/gallery/girl4.jpg",
            hover: "./assets/gallery/girl4.jpg",
        },
        sizes: ["39", "40", "41", "42"],
        colors: [
            {
                label: "Black",
                bgImg: "./assets/gallery/girl4.jpg",
                bgColor: "bg-black",
            },
        ],
    },
];
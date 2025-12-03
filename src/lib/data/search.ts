import { Collection, Product, RecentSearch } from "@/types/search";

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
        href: "/products/1",
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
        href: "/products/2",
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
        href: "/products/3",
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
        href: "/products/4",
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
        href: "/products/5",
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
        href: "/products/6",
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
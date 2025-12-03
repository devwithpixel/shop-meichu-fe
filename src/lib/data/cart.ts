import { CartItem, RecommendedProduct } from "@/types/cart";

export const INITIAL_CART_ITEMS: CartItem[] = [
    {
        id: 1,
        name: "Long-Sleeve Sports Tee",
        price: 3700,
        href: "/products/1",
        image: "./assets/gallery/girl3.jpg",
        quantity: 1,
    },
    {
        id: 2,
        name: "Running Shorts",
        price: 2500,
        href: "/products/2",
        image: "./assets/gallery/girl3.jpg",
        quantity: 2,
    },
    {
        id: 3,
        name: "Sports Jacket",
        price: 5400,
        href: "/products/3",
        image: "./assets/gallery/girl3.jpg",
        quantity: 1,
    },
];

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
    {
        id: 101,
        name: "Sports Cap",
        href: "/products/1",
        price: 850,
        image: "./assets/gallery/girl3.jpg"
    },
    {
        id: 102,
        name: "Water Bottle",
        href: "/products/2",
        price: 450,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 103,
        name: "Gym Bag",
        href: "/products/3",
        price: 3200,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 104,
        name: "Sports Socks",
        href: "/products/4",
        price: 650,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 105,
        name: "Wristband Set",
        href: "/products/5",
        price: 380,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 106,
        name: "Training Gloves",
        href: "/products/6",
        price: 1200,
        image: "./assets/gallery/girl3.jpg",
    },
];
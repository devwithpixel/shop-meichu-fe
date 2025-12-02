import { CartItem, RecommendedProduct } from "@/types/cart";

export const INITIAL_CART_ITEMS: CartItem[] = [
    {
        id: 1,
        name: "Long-Sleeve Sports Tee",
        price: 3700,
        image: "./assets/gallery/girl3.jpg",
        variant: "Black / M",
        quantity: 1,
    },
    {
        id: 2,
        name: "Running Shorts",
        price: 2500,
        image: "./assets/gallery/girl3.jpg",
        variant: "Navy / L",
        quantity: 2,
    },
    {
        id: 3,
        name: "Sports Jacket",
        price: 5400,
        image: "./assets/gallery/girl3.jpg",
        variant: "Gray / XL",
        quantity: 1,
    },
];

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
    {
        id: 101,
        name: "Sports Cap",
        price: 850,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 102,
        name: "Water Bottle",
        price: 450,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 103,
        name: "Gym Bag",
        price: 3200,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 104,
        name: "Sports Socks",
        price: 650,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 105,
        name: "Wristband Set",
        price: 380,
        image: "./assets/gallery/girl3.jpg",
    },
    {
        id: 106,
        name: "Training Gloves",
        price: 1200,
        image: "./assets/gallery/girl3.jpg",
    },
];
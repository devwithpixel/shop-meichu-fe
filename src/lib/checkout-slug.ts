import { CheckoutItemProduct, CheckoutSession } from "@/types/checkout";

const generateSlug = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let slug = "";
    for (let i = 0; i < 12; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
};

export const createCheckoutSession = (items: CheckoutItemProduct[]): CheckoutSession => {
    return {
        slug: generateSlug(),
        items: items,
        createdAt: new Date().toISOString()
    };
};
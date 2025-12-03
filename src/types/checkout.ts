export interface CheckoutItemProduct {
    id: number;
    name: string;
    price: number;
    count: number;
    image: string;
}

export interface CheckoutFormData {
    buyerName: string;
    contact: string;
}

export interface CheckoutSession {
    slug: string;
    items: CheckoutItemProduct[];
    createdAt: string;
}
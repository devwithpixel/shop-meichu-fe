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
    href: string;
    price: number;
    images: {
        front: string;
        hover: string;
    };
    sizes: string[];
    colors: ProductColor[];
}

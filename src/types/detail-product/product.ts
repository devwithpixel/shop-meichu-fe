export interface ProductColor {
  bgImg: string;
  label: string;
}

export interface ProductImages {
  front: string;
  hover: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: ProductImages;
  colors: ProductColor[];
  sizes: string[];
}

export interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  images: ProductImages;
}

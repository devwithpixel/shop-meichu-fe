export interface ProductDescItem {
  id: number;
  title: string;
  content: string;
}

export const productDesc: ProductDescItem[] = [
  {
    id: 1,
    title: "DESCRIPTION",
    content: `
      Cause if one day you wake up and find that you're missing me
      And your heart starts to wonder where on this Earth I could be...
    `,
  },
  {
    id: 2,
    title: "INTERNATIONAL SHIPPING AVAILABLE",
    content: `
      We ship worldwide with secure tracking. Delivery times vary by region.
    `,
  },
  {
    id: 3,
    title: "PREMIUM FABRICS",
    content: `
      Made using high-quality breathable materials designed for durability.
    `,
  },
  {
    id: 4,
    title: "DISCOVER YOUR PERFECT SIZE",
    content: `
      Refer to our detailed size chart to ensure the best fit.
    `,
  },
];

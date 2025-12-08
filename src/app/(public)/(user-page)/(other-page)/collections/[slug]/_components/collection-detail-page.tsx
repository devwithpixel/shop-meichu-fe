"use client";

import { useEffect } from "react";
import { useFooter } from "@/context/footer-provider";
import IconElement from "@/components/ui/icon-element";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";
import Link from "next/link";

import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";

export default function CollectionDetailPage({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const { setBackgroundColor } = useFooter();

  useEffect(() => {
    setBackgroundColor(category.backgroundColor);
  }, [category.backgroundColor]);

  return (
    <div className="bg-[#D9E4E8]">
      <HeaderPage
        type="collections"
        img={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.heading?.thumbnail?.url}`}
        title={category.heading!.title}
        desc={category.heading!.description}
      />
      <div className="relative">
        <IconElement variant={2} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <Link href="/collections">
            <button className="mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>

          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} size="lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { useProductNavigation } from "@/hooks/use-product-navigation";
import ProductNavigationCard from "@/components/card/detail-product/product-navigation";
import OverviewSection from "./overview-section";
import DescriptionSection from "./description-section";
import SpecificationsSection from "./specifications-section";
import TrendingProduct from "@/components/card/trending-product";

interface ProductSection {
  label: string;
  component: ReactNode;
}

interface ProductDetailSectionProps {
  product: any;
  relatedProducts: any[];
  productDesc: any;
}

export default function ProductDetailSection({
  product,
  relatedProducts,
  productDesc,
}: ProductDetailSectionProps) {
  const sections: ProductSection[] = [
    {
      label: "OVERVIEW",
      component: (
        <OverviewSection product={product} relatedProducts={relatedProducts} />
      ),
    },
    {
      label: "DESCRIPTION",
      component: (
        <DescriptionSection desc={productDesc} image={product.images.front} />
      ),
    },
    {
      label: "SPECIFICATIONS",
      component: <SpecificationsSection product={product} />,
    },
  ];

  const {
    activeSection,
    navRef,
    indicatorRef,
    buttonsRef,
    sectionRefs,
    scrollToSection,
  } = useProductNavigation(sections.length);

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
        >
          {section.component}
        </section>
      ))}

      <div className="bg-white px-6 py-20">
        <h1 className="font-rubik text-5xl font-semibold mb-12">
          More to Explore
        </h1>
        <div className="flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide overflow-y-hidden">
          {relatedProducts.map((item) => (
            <TrendingProduct key={item.id} product={item} />
          ))}
        </div>
      </div>

      <ProductNavigationCard
        sections={sections}
        activeSection={activeSection}
        navRef={navRef}
        indicatorRef={indicatorRef}
        buttonsRef={buttonsRef}
        onSectionClick={scrollToSection}
      />
    </>
  );
}

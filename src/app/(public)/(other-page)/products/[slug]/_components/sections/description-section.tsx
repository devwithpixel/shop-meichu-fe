"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types/strapi/models/product";

interface DescriptionSectionProps {
  ref: React.RefObject<HTMLDivElement | null>;
  product: Product;
  image: string;
}

export default function DescriptionSection({
  ref,
  product,
  image,
}: DescriptionSectionProps) {
  return (
    <div
      ref={ref}
      className="min-h-fit lg:min-h-screen text-white flex flex-col md:flex-row items-start gap-14 md:gap-6 lg:gap-14 px-4 md:px-6"
    >
      <div className="w-full md:w-1/2 lg:w-1/2 font-rubik flex flex-col items-start mt-10 md:mt-40 lg:mt-45">
        {product.fields && product.fields.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            {product.fields.map((field, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  iconBg="bg-white"
                  iconColor="text-black"
                  className="text-xl lg:text-3xl -mb-2 md:-mb-1 lg:mb-3 font-bold md:font-medium"
                >
                  {field.title}
                </AccordionTrigger>

                <AccordionContent className="text-balance">
                  {field.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <div className="w-fit rounded-3xl bg-gray-300 -mt-10 md:mt-30">
        <img
          src={image}
          className="w-170 h-76 md:h-80 lg:h-140 object-cover rounded-3xl"
          alt="Product"
        />
      </div>
    </div>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type DescItem = {
  id: number;
  title: string;
  content: string;
};

interface DescriptionSectionProps {
  desc?: DescItem[];
  image: string;
}

export default function DescriptionSection({
  desc,
  image,
}: DescriptionSectionProps) {
  return (
    <div className="min-h-fit lg:min-h-screen bg-black text-white flex flex-col md:flex-row items-start gap-14 md:gap-6 lg:gap-14 px-4 md:px-6">
      <div className="w-full md:w-1/2 lg:w-1/2 font-rubik flex flex-col items-start mt-10 md:mt-40 lg:mt-45">
        <Accordion type="single" collapsible className="w-full">
          {desc?.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="border-white"
            >
              <AccordionTrigger className="text-xl lg:text-3xl -mb-2 md:-mb-1 lg:mb-3 font-bold md:font-medium">
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="text-balance">
                <p>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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

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
  desc: DescItem[];
  image: string;
}

export default function DescriptionSection({
  desc,
  image,
}: DescriptionSectionProps) {
  return (
    <div className="min-h-screen bg-black text-white flex items-start gap-14 px-6">
      <div className="w-1/2 font-rubik flex flex-col items-start mt-45">
        <Accordion type="single" collapsible className="w-full">
          {desc.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="border-white"
            >
              <AccordionTrigger className="text-3xl mb-3">
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="text-balance">
                <p>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="w-4/6 rounded-3xl bg-gray-300 mt-30">
        <img
          src={image}
          className="w-170 h-140 object-cover rounded-3xl"
          alt="Product"
        />
      </div>
    </div>
  );
}

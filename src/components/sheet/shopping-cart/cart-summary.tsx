import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  grandTotal: number;
  specialInstructions: string;
  onSpecialInstructionsChange: (value: string) => void;
}

export default function CartSummary({
  subtotal,
  grandTotal,
  specialInstructions,
  onSpecialInstructionsChange,
}: CartSummaryProps) {
  return (
    <div className="sticky bottom-0 inset-x-0 lg:inset-x-auto bg-white border-t px-6 py-5 z-20 shrink-0 space-y-4 rounded-t-4xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="instructions" className="rounded-xl">
          <AccordionTrigger className="font-medium text-sm flex p-0 justify-between">
            Order special instructions
          </AccordionTrigger>

          <AccordionContent className="mt-3">
            <Textarea
              value={specialInstructions}
              onChange={(e) => onSpecialInstructionsChange(e.target.value)}
              placeholder="Add special instructions…"
              className="h-36 text-sm border border-black focus-visible:ring-0 focus-visible:outline-none focus:border-black rounded-2xl resize-none"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="text-sm space-y-1">
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <p className="text-gray-500 text-xs">Calculated at checkout.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Grand total</div>
        <div className="text-2xl font-bold">{formatCurrency(grandTotal)}</div>
      </div>

      <div className="flex gap-3">
        <Button className="bg-black hover:text-black text-white hover:border-2 hover:border-black py-6 rounded-full font-medium w-full hover:bg-transparent">
          Check out
        </Button>
      </div>
    </div>
  );
}

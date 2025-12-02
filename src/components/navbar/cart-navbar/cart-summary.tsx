import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CartSummaryProps {
  subtotal: number;
  giftWrap: boolean;
  grandTotal: number;
  specialInstructions: string;
  onGiftWrapChange: (checked: boolean) => void;
  onSpecialInstructionsChange: (value: string) => void;
}

export default function CartSummary({
  subtotal,
  giftWrap,
  grandTotal,
  specialInstructions,
  onGiftWrapChange,
  onSpecialInstructionsChange,
}: CartSummaryProps) {
  return (
    <div className="fixed lg:sticky bottom-0 inset-x-0 lg:inset-x-auto bg-white border-t px-6 py-5 z-20 shrink-0 space-y-4 rounded-t-4xl">
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

      <div className="flex items-start gap-2 border-y py-2">
        <Checkbox
          id="giftWrap"
          checked={giftWrap}
          onCheckedChange={(checked) => onGiftWrapChange(checked as boolean)}
        />
        <label
          htmlFor="giftWrap"
          className="text-sm text-gray-700 cursor-pointer"
        >
          Add a gift wrap to make your order extra special! (+$500)
        </label>
      </div>

      <div className="text-sm space-y-1">
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>

        {giftWrap && (
          <div className="flex justify-between text-gray-600">
            <span>Gift wrap</span>
            <span>$500</span>
          </div>
        )}

        <p className="text-gray-500 text-xs">
          Taxes included. Discounts and{" "}
          <u className="cursor-pointer hover:text-gray-700">shipping</u>{" "}
          calculated at checkout.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Grand total</div>
        <div className="text-2xl font-bold">${grandTotal.toLocaleString()}</div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="border-2 border-black text-black bg-white py-6 rounded-full font-medium w-1/4 hover:bg-black hover:text-white"
        >
          View cart
        </Button>

        <Button className="bg-black hover:text-black text-white hover:border-2 hover:border-black py-6 rounded-full font-medium w-3/4 hover:bg-transparent">
          Check out
        </Button>
      </div>
    </div>
  );
}

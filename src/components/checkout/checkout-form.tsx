import { CheckoutFormData } from "@/types/checkout";
import { CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export default function CheckoutForm({
  formData,
  onChange,
  onSubmit,
}: {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 font-inter">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-6 h-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900 font-rubik">
            Contact Information
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <Label
              htmlFor="buyerName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <Input
              id="buyerName"
              name="buyerName"
              required
              placeholder="Tio Naik Motor"
              value={formData.buyerName}
              onChange={(e) => onChange("buyerName", e.target.value)}
              className="rounded-lg border-gray-30 h-12 focus-visible:ring-0"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <Label
              htmlFor="contact"
              className="text-sm font-medium text-gray-700"
            >
              Contact (Email or Phone)
            </Label>
            <Input
              id="contact"
              name="contact"
              required
              placeholder="minecraft@gmail.com / 08123456789"
              value={formData.contact}
              onChange={(e) => onChange("contact", e.target.value)}
              className="rounded-lg border-gray-300 h-12 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <Button
        variant="default"
        onClick={onSubmit}
        className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group disabled:opacity-50 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <CreditCard
            size={100}
            className="text-white group-hover:-translate-x-1 transition-transform"
          />
          Complete Order
        </div>
      </Button>
    </div>
  );
}

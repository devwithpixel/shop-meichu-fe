import { CheckoutItemProduct } from "@/types/checkout";

export default function CheckoutItemCard({ item }: { item: CheckoutItemProduct }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0 font-inter">
      <div className="relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
          {item.count}
        </div>
      </div>

      <div className="flex-1 flex justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold pr-10 md:max-w-none text-sm text-gray-900">{item.name}</h3>
        </div>
        <div className="text-sm font-bold text-gray-900 flex items-center pr-4">
          $
          {(item.price * item.count).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
}

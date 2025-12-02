import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { INITIAL_CART_ITEMS, RECOMMENDED_PRODUCTS } from "@/lib/data/cart";
import { CartItem as CartItemType, RecommendedProduct } from "@/types/cart";
import CartItem from "./cart-item";
import RecommendedProducts from "./recommended-products";
import CartSummary from "./cart-summary";

export default function ShoppingBag() {
  const [isOpenBag, setIsOpenBag] = useState(false);
  const isMobile = useIsMobile();

  const [cartItems, setCartItems] =
    useState<CartItemType[]>(INITIAL_CART_ITEMS);
  const [giftWrap, setGiftWrap] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = subtotal + (giftWrap ? 500 : 0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const addRecommendedToCart = (product: RecommendedProduct) => {
    const newItem: CartItemType = {
      id: Date.now(),
      name: product.name,
      price: product.price,
      image: product.image,
      variant: "Default",
      quantity: 1,
    };
    setCartItems((items) => [...items, newItem]);
  };

  return (
    <Sheet open={isOpenBag} onOpenChange={setIsOpenBag}>
      <SheetTrigger asChild>
        <button className="text-white border-none hover:bg-gray-900 p-2 rounded-full flex items-center justify-center relative">
          <FiShoppingBag className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side={isMobile ? "top" : "right"}
        defaultRight="
          data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right inset-y-0 right-0 h-[95%] w-[35%]"
        defaultTop="data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top inset-x-0 top-0 w-full h-auto"
        className="md:rounded-3xl md:mr-8 md:my-6 bg-white border-none shadow-xl transition-all p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 bg-[#f2f2f2] px-6 py-5 border-b z-20 shrink-0">
            <SheetTitle className="text-2xl font-bold">
              Shopping bag ({cartItems.length})
            </SheetTitle>
          </div>

          <div className="flex-1 overflow-hidden bg-[#f2f2f2]">
            <ScrollArea className="lg:h-full">
              <div className="px-6 py-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FiShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Add items to get started
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))
                )}

                {cartItems.length > 0 && (
                  <RecommendedProducts
                    products={RECOMMENDED_PRODUCTS}
                    onAddToCart={addRecommendedToCart}
                  />
                )}
              </div>
            </ScrollArea>
          </div>

          {cartItems.length > 0 && (
            <CartSummary
              subtotal={subtotal}
              giftWrap={giftWrap}
              grandTotal={grandTotal}
              specialInstructions={specialInstructions}
              onGiftWrapChange={setGiftWrap}
              onSpecialInstructionsChange={setSpecialInstructions}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

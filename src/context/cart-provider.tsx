"use client";

import { createContext, useContext, useState } from "react";
import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CartItem } from "@/types/cart";

interface CartStoreType {
  items: CartItem[];
  note: string | undefined;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, addition: number) => void;
  setNote: (note: string | undefined) => void;
  reset: () => void;
}

const useCartStore = create<CartStoreType>()(
  persist(
    mutative((set) => ({
      items: [],
      note: undefined,
      setItems: (items) => set({ items }),
      addItem: (item) =>
        set((draft) => {
          const draftItem = draft.items.find(
            (draftItem) => draftItem.id === item.id
          );
          if (!draftItem) {
            if (item.stock > 0) {
              draft.items.push(item);
              return;
            }
            return;
          }

          if (draftItem.stock - (draftItem.quantity + item.quantity) < 0)
            return;

          draftItem.quantity += item.quantity;
        }),
      removeItem: (id) =>
        set((draft) => {
          draft.items.splice(
            draft.items.findIndex((item) => item.id === id),
            1
          );
        }),
      updateQuantity: (id, addition) =>
        set((draft) => {
          if (addition === 0) return;

          const item = draft.items.find((item) => item.id === id);
          if (
            !item ||
            item.stock - (item.quantity + addition) < 0 ||
            item.quantity + addition < 1
          )
            return;

          item.quantity += addition;
        }),
      setNote: (note) => set({ note }),
      reset: () => set({ items: [], note: undefined }),
    })),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface CartContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, addition: number) => void;
  note: string | undefined;
  setNote: (note: string | undefined) => void;
  reset: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    items,
    setItems,
    addItem,
    removeItem,
    updateQuantity,
    note,
    setNote,
    reset: resetCart,
  } = useCartStore();

  const reset = () => {
    resetCart();
    setIsOpen(false);
  };

  return (
    <CartContext
      value={{
        isOpen,
        setIsOpen,
        items,
        setItems,
        addItem,
        removeItem,
        updateQuantity,
        note,
        setNote,
        reset,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

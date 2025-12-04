"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useMutative } from "use-mutative";

import type { CartItem } from "@/types/cart";

interface CartContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, addition: number) => void;
  note: string | undefined;
  setNote: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [items, setItems] = useMutative<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((draft) => {
      const draftItem = draft.find((draftItem) => draftItem.id === item.id);
      if (!draftItem) {
        if (item.stock > 0) {
          draft.push(item);
          return;
        }
        return;
      }

      if (draftItem.stock - (draftItem.quantity + item.quantity) < 0) return;

      draftItem.quantity += item.quantity;
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((draft) => {
      draft.splice(
        draft.findIndex((item) => item.id === id),
        1
      );
    });
  }, []);

  const updateQuantity = useCallback((id: number, addition: number) => {
    if (addition === 0) return;

    setItems((draft) => {
      const item = draft.find((item) => item.id === id);
      if (
        !item ||
        item.stock - (item.quantity + addition) < 0 ||
        item.quantity + addition < 1
      )
        return;

      item.quantity += addition;
    });
  }, []);

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

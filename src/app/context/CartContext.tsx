"use client";
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@prisma/client";

type Id = string;

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  id: Id;
};

type CartContextType = {
  items: Map<Id, CartItem>;
  addItem: (item: Product) => void;
  removeItem: (id: Id) => void;
  clearCart: () => void;
};

type CartContextProps = PropsWithChildren;

const Context = createContext<CartContextType | null>(null);

export default function CartContext({ children }: CartContextProps) {
  const [items, setItems] = useState<Map<Id, CartItem>>(new Map());

  const addItem = useCallback((item: Product) => {
    setItems((prevItems) => {
      const newItems = new Map(prevItems);
      const existingItem = newItems.get(item.id);

      if (existingItem) {
        newItems.set(item.id, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        newItems.set(item.id, { ...item, quantity: 1 });
      }
      return newItems;
    });
  }, []);

  const removeItem = useCallback((id: Id) => {
    setItems((prevItems) => {
      const newItems = new Map(prevItems);
      newItems.delete(id);
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems(new Map());
  }, []);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, addItem, removeItem, clearCart]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useCartContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error("The CartContext is missing or initial state is falsy");
  }

  return ctx;
};

export { CartContext, useCartContext };

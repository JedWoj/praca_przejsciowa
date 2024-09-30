"use client";
import { useCartContext } from "@/app/context/CartContext";

export default function ShoppingCartItemsCounter() {
  const { items } = useCartContext();

  const totalItems = Array.from(items.values()).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="absolute top-0 left-0 bg-orange-400 rounded-full w-5 h-5 flex justify-center items-center text-white">
      {totalItems}
    </div>
  );
}

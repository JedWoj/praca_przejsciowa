"use client";
import type { Product } from "@/app/api/products/models/Product";
import Button from "@/app/components/UI/Button";
import { useCartContext } from "@/app/context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";

type OrderProductBtnsProps = {
  product: Product;
};

export default function OrderProductBtns({ product }: OrderProductBtnsProps) {
  const { addItem, removeItem, items } = useCartContext();

  const handleIncrement = () => {
    addItem(product);
  };

  const handleDecrement = () => {
    removeItem(product.id);
  };

  const shouldDecrementBeVisible = items.get(product.id)?.quantity;

  return (
    <div className="flex gap-2">
      {shouldDecrementBeVisible ? (
        <Button handleClick={handleDecrement} variant="secondary">
          <FaMinus />
        </Button>
      ) : null}
      <Button handleClick={handleIncrement}>
        <FaPlus />
      </Button>
    </div>
  );
}

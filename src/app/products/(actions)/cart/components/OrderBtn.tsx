"use client";
import Button from "@/app/components/UI/Button";
import { useCartContext } from "@/app/context/CartContext";

export default function OrderBtn() {
  const { items } = useCartContext();

  const handleClick = () => {
    console.log("Ordering items", items);
  };

  return (
    <Button buttonProps={{ disabled: !items.size }} handleClick={handleClick}>
      Order
    </Button>
  );
}

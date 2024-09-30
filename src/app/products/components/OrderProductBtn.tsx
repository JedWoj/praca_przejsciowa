"use client";
import type { Product } from "@/app/api/products/models/Product";
import Button from "@/app/components/UI/Button";
import { useCartContext } from "@/app/context/CartContext";

type OrderProductBtnProps = {
  product: Product;
};

export default function OrderProductBtn({ product }: OrderProductBtnProps) {
  const { addItem } = useCartContext();

  const handleClick = () => {
    addItem(product);
  };

  return <Button handleClick={handleClick}>+</Button>;
}

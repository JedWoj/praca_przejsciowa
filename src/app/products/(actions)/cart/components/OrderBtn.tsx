"use client";
import { useRouter } from "next/navigation";
import { orderProducts } from "@/app/actions/order-products";
import Button from "@/app/components/UI/Button";
import { useCartContext } from "@/app/context/CartContext";

export default function OrderBtn() {
  const { items, clearCart } = useCartContext();

  const router = useRouter();

  const handleClick = () => {
    orderProducts({
      products: Array.from(items.entries()).map(([id, item]) => ({
        id,
        quantity: item.quantity,
      })),
      status: "pending",
      orderDate: new Date(),
    });
    clearCart();
    router.back();
  };

  return (
    <Button buttonProps={{ disabled: !items.size }} handleClick={handleClick}>
      Order
    </Button>
  );
}

"use client";
import { orderProducts } from "@/app/actions/order-products";
import Button from "@/app/components/UI/Button";
import { useCartContext } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function OrderBtn() {
  const { items, clearCart, dueDate } = useCartContext();

  const router = useRouter();

  const handleClick = () => {
    orderProducts({
      products: Array.from(items.entries()).map(([id, item]) => ({
        id,
        quantity: item.quantity,
      })),
      status: "pending",
      orderDate: dueDate!,
    });
    clearCart();
    router.back();
  };

  return (
    <Button
      buttonProps={{ disabled: !items.size || !dueDate }}
      handleClick={handleClick}
    >
      Place an order
    </Button>
  );
}

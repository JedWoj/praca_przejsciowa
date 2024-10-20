import type { Order } from "@/app/api/orders/models/Order";
import { OrderPreviewBtns } from "./OrderPreviewBtns";
import Link from "next/link";

type OrderPreviewProps = {
  order: Record<string, Order>;
};

export function OrderPreview({ order }: OrderPreviewProps) {
  const orderId = Object.keys(order).at(0) ?? "";

  return (
    <div className="bg-green-400 rounded-md text-white mt-2 flex items-center justify-between gap-2 pr-2">
      <Link className="cursor-pointer p-4" href={`/orders/${orderId}`}>
        <span>Order: {orderId}</span>
      </Link>
      <OrderPreviewBtns orderId={orderId} />
    </div>
  );
}

import { OrderPreviewBtns } from "./OrderPreviewBtns";
import Link from "next/link";
import { Order } from "@prisma/client";

type OrderPreviewProps = {
  order: Order;
};

export function OrderPreview({ order }: OrderPreviewProps) {
  return (
    <div className="bg-green-400 rounded-md text-white mt-2 flex items-center justify-between gap-2 pr-2">
      <Link className="cursor-pointer p-4" href={`/orders/${order.id}`}>
        <span>Order: {order.id}</span>
      </Link>
      <OrderPreviewBtns orderId={order.id} />
    </div>
  );
}

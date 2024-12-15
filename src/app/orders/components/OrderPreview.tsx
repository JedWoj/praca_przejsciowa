import Link from "next/link";
import { Order } from "@prisma/client";
import { format } from "date-fns";

type OrderPreviewProps = {
  order: Order;
};

export function OrderPreview({ order }: OrderPreviewProps) {
  return (
    <div className="bg-green-400 rounded-md text-white mt-2 flex items-center justify-between gap-2 p-2">
      <div className="flex gap-2">
        <span className="font-bold">Order:</span> {order.id}
        <span className="font-bold">Due date:</span>
        {format(order.dueDate, "yyyy-MM-dd")}
      </div>
      <Link
        className="cursor-pointer px-4 py-2 bg-blue-400 rounded-lg"
        href={`/orders/${order.id}`}
      >
        Details
      </Link>
    </div>
  );
}

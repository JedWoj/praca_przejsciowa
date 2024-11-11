"use client";
import { Prisma } from "@prisma/client";

type OrderItemProps = {
  order: Prisma.OperationGetPayload<null>;
};

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <li
      className="p-2 bg-pink-300 hover:bg-pink-100 cursor-pointer rounded-lg min-w-40"
      id={order.id}
    >
      {order.name}
    </li>
  );
}

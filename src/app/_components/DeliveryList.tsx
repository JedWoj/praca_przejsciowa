"use client";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import { useDeliveryContext } from "../_context/DeliveryContext";

export function DeliveryList() {
  const { deliveries } = useDeliveryContext();

  return (
    <ul className="text-white">
      {deliveries.map((delivery) => (
        <DeliveryItem key={delivery.id}>
          <Link href={`/delivery/${delivery.id}`}>{delivery.name}</Link>
        </DeliveryItem>
      ))}
    </ul>
  );
}

function DeliveryItem({ children }: PropsWithChildren) {
  return (
    <li className="p-4 cursor-pointer bg-gradient-to-r from-blue-500 to-green-400 text-center">
      {children}
    </li>
  );
}

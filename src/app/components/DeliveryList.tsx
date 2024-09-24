"use client";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import { useDeliveryContext } from "../context/DeliveryContext";

export function DeliveryList() {
  const { deliveries } = useDeliveryContext();

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-49px)]">
      {deliveries.length === 0 ? (
        <h2 className="text-3xl text-white text-center">
          No Deliveries Found!
        </h2>
      ) : (
        <ul className="text-white w-[50%] flex flex-col gap-2">
          {deliveries.map((delivery) => (
            <Link key={delivery.id} href={`/delivery/${delivery.id}`}>
              <DeliveryItem>{delivery.name}</DeliveryItem>
            </Link>
          ))}
        </ul>
      )}
    </section>
  );
}

function DeliveryItem({ children }: PropsWithChildren) {
  return (
    <li className="p-4 cursor-pointer bg-gradient-to-r from-blue-500 to-green-400 text-center rounded-lg shadow-2xl text-2xl">
      {children}
    </li>
  );
}

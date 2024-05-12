import type { PropsWithChildren } from "react";
import { defaultDeliveries } from "../utils/static";
import Link from "next/link";

export function DeliveryList() {
  return (
    <ul className="text-white">
      {defaultDeliveries.map((delivery) => (
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

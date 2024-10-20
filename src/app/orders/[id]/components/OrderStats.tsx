import type { Order } from "@/app/api/orders/models/Order";
import type { Product } from "@/app/products/types";

type OrderStatsProps = {
  order: Order;
  products: Product[];
};

export function OrderStats({ order, products }: OrderStatsProps) {
  const totalPrice = products.reduce(
    (acc, it) =>
      (acc +=
        it.price *
        (order.products.find((prod) => prod.id === it.id)?.quantity ?? 0)),
    0
  );
  const totalProducts = order.products.reduce(
    (acc, it) => (acc += it.quantity),
    0
  );

  return (
    <div className="flex-col flex gap-2 mt-4 grow">
      <div className="bg-green-400 p-2 rounded-md">
        <p>Order Stats:</p>
        <p>Total Price: {totalPrice}</p>
        <p>Total Products: {totalProducts}</p>
      </div>
    </div>
  );
}

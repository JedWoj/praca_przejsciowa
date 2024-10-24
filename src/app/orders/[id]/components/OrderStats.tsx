import { getOrder } from "./utils/getOrder";

type OrderStatsProps = {
  id: string;
};

export async function OrderStats({ id }: OrderStatsProps) {
  const order = await getOrder(id);
  const totalPrice = order?.products.reduce(
    (acc, it) => (acc += it.product.price * it.quantity),
    0
  );
  const totalProducts = order?.products.reduce(
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

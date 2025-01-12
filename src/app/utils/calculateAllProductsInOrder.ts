import { MappedOrders } from "../api/check-orders/route";

export function calculateAllProductsInOrder(orders: MappedOrders) {
  const products = orders.flatMap((order) => order.products);

  const groupedProducts = Object.groupBy(products, ({ id }) => id);

  const summedTotalProductRequirements = Object.entries(groupedProducts).map(
    ([key, value]) => ({
      id: key,
      value: value?.reduce((curr, acc) => curr + acc.quantity, 0),
    }),
  );
  return summedTotalProductRequirements;
}

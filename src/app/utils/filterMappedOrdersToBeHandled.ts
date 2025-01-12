import type { MappedOrders } from "../api/check-orders/route";

export function filterMappedOrdersToBeHandled(orders: MappedOrders) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const now = new Date();

  return orders.filter((order) => {
    const timeToProduceOrder = order.products.reduce((acc, product) => {
      return acc + product.requiredTime * 1000;
    }, 0);

    const latestProductionStartTime = new Date(
      order.dueDate.getTime() - timeToProduceOrder,
    );
    const partsDeliveryTime = new Date(
      latestProductionStartTime.getTime() - oneDayInMilliseconds,
    );

    return (
      (partsDeliveryTime <= now && latestProductionStartTime > now) ||
      order.dueDate < now
    );
  });
}

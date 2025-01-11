import type { MappedOrders } from "../api/check-orders/route";

export function filterMappedOrdersToBeHandled(orders: MappedOrders) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000 * 1;
  const now = new Date();

  return orders.filter((order) => {
    const timeDifference = order.dueDate.getTime() - now.getTime();

    return (
      (timeDifference < oneDayInMilliseconds && timeDifference) ||
      order.dueDate < now
    );
  });
}

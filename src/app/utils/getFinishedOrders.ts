import type { MappedOrders } from "../api/check-orders/route";

export function getFinishedOrders(orders: MappedOrders) {
  return orders.filter(
    (order) => order.dueDate.getTime() <= new Date().getTime(),
  );
}

import type { Order } from "../orders/[id]/components/utils/getOrder";

export function prepareProductsFromOrder(order: Order) {
  return order.products.map(({ product, quantity }) => ({
    id: product.id,
    quantity,
    operations: product.ProductOperation.map(({ operation, sequence }) => ({
      sequence,
      time: operation.time,
    })),
  }));
}

import { Prisma } from "@prisma/client";

export function calculateRequiredMaterialsFromOrder(
  orders: Prisma.OrderGetPayload<{
    include: {
      products: { include: { product: { include: { parts: true } } } };
    };
  }>[]
) {
  const orderParts = orders.flatMap((order) => ({
    parts: order.products.map((it) => it.product.parts),
    id: order.id,
  }));

  const mappedOrderedParts = orderParts.flatMap((order) =>
    order.parts.flatMap((it) =>
      it.map((i) => ({ partId: i.partId, quantity: i.quantity }))
    )
  );

  const groupedParts = Object.groupBy(
    mappedOrderedParts,
    ({ partId }) => partId
  );

  const summedTotalPartRequirements = Object.entries(groupedParts).map(
    ([key, value]) => ({
      id: key,
      value: value?.reduce((curr, acc) => curr + acc.quantity, 0),
    })
  );

  return summedTotalPartRequirements;
}

import type { MappedOrders } from "../api/check-orders/route";

export type RequiredMaterial = {
  id: string;
  value?: number;
};

export function calculateRequiredMaterialsFromMappedOrders(
  orders: MappedOrders
): RequiredMaterial[] {
  const allMaterials = orders.flatMap((order) =>
    order.products.flatMap((product) => product.requiredMaterials)
  );
  const groupedParts = Object.groupBy(allMaterials, ({ id }) => id);

  const summedTotalPartRequirements = Object.entries(groupedParts).map(
    ([key, value]) => ({
      id: key,
      value: value?.reduce((curr, acc) => curr + acc.value!, 0),
    })
  );

  return summedTotalPartRequirements;
}

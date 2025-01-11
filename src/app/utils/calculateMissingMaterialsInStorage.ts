import type { RequiredMaterial } from "./calculateRequiredMaterialsFromMappedOrders";

export function calculateMissingMaterialsinStorage(
  requiredMaterials: RequiredMaterial[],
  availableMaterials: RequiredMaterial[]
): RequiredMaterial[] {
  console.log("requiredMaterials", requiredMaterials);
  console.log("availableMaterials", availableMaterials);

  const missingMaterials = requiredMaterials.map((requiredMaterial) => {
    const availableMaterial = availableMaterials.find(
      (it) => it.id === requiredMaterial.id
    );
    if (!availableMaterial) {
      console.log("no availableMaterial", availableMaterial);

      return {
        id: requiredMaterial.id,
        value: requiredMaterial.value,
      };
    }

    console.log("availableMaterial", availableMaterial);

    const neededMaterial =
      (requiredMaterial.value ?? 0) - (availableMaterial.value ?? 0);

    return {
      id: requiredMaterial.id,
      value: neededMaterial > 0 ? neededMaterial : 0,
    };
  });

  return missingMaterials;
}

import { addProduct } from "@/app/actions/add-product-form";
import type { MapppedPart } from "@/app/products/utils/convertPartsToArray";
import { Prisma } from "@prisma/client";
import { useActionState, useState } from "react";
import type { FormEntry } from "../../components/types";

type ProductFormEntries = {
  name: FormEntry<string>;
  price: FormEntry<number>;
};

export function useAddProductState() {
  const [formVal, setFormVal] = useState<ProductFormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    price: {
      label: "Price",
      uniqueName: "price",
      value: 0,
      inputProps: { type: "number" },
    },
  });
  const [mappedParts, setMappedParts] = useState<Map<string, MapppedPart>>(
    new Map(),
  );
  const [productsOperations, setProductsOperations] = useState<
    Array<{ operation: Prisma.OperationGetPayload<null>; parts: MapppedPart[] }>
  >([]);

  const [state, FormAction] = useActionState(
    addProduct.bind(null, productsOperations),
    "",
  );

  return {
    formVal,
    setFormVal,
    mappedParts,
    setMappedParts,
    productsOperations,
    setProductsOperations,
    state,
    FormAction,
  };
}

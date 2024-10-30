"use client";
import { addProduct } from "@/app/actions/add-product-form";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";
import Button from "@/app/components/UI/Button";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import PartsSelection from "@/app/products/components/PartsSelection";
import type { MapppedPart } from "@/app/products/utils/convertPartsToArray";
import { Prisma } from "@prisma/client";
import { useActionState, useState } from "react";
import ProductInfoInputs, { type FormEntry } from "./ProductInfoInputs";

export type ProductFormEntries = {
  name: FormEntry<string>;
  price: FormEntry<number>;
};

type ProductContainerProps = {
  parts: Prisma.PartGetPayload<null>[];
};

export default function ProductContainer({ parts }: ProductContainerProps) {
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
    new Map()
  );

  const [state, FormAction] = useActionState(
    addProduct.bind(null, mappedParts),
    ""
  );

  useRefreshPageAfterAction({
    state,
    successMessage: SUCCESS_MESSAGES.product,
  });

  return (
    <div>
      <form action={FormAction} className="flex gap-4">
        <div className="flex flex-col justify-between">
          <ProductInfoInputs formVal={formVal} setFormVal={setFormVal} />
          <Button
            buttonProps={{ type: "submit", style: { width: "100%" } }}
            handleClick={() => {}}
          >
            Add
          </Button>
        </div>
        <PartsSelection
          parts={parts}
          selectionState={mappedParts}
          handleSelection={setMappedParts}
        />
      </form>
      {state}
    </div>
  );
}

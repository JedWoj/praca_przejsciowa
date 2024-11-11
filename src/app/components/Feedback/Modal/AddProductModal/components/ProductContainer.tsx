"use client";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";
import Button from "@/app/components/UI/Button";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import OrderSelection from "@/app/products/components/OrderSelection";
import PartsSelection from "@/app/products/components/PartsSelection";
import ProductOperationsList from "@/app/products/components/ProductOperationsList";
import { Prisma } from "@prisma/client";
import FormInputsGroup from "../../components/FormInputsGroup";
import { useAddProductState } from "../hooks/useAddProductState";

type ProductContainerProps = {
  parts: Prisma.PartGetPayload<null>[];
  operations: Prisma.OperationGetPayload<null>[];
};

export default function ProductContainer({
  parts,
  operations,
}: ProductContainerProps) {
  const {
    FormAction,
    formVal,
    mappedParts,
    productsOperations,
    setFormVal,
    setMappedParts,
    setProductsOperations,
    state,
  } = useAddProductState();

  const handleSelection = (id: string) => {
    setProductsOperations((prev) =>
      prev.concat({
        operation: operations.find((op) => op.id === id)!,
        parts: Array.from(mappedParts.values()),
      })
    );
    setMappedParts(new Map());
  };

  useRefreshPageAfterAction({
    state,
    successMessage: SUCCESS_MESSAGES.product,
  });

  return (
    <div>
      <form action={FormAction} className="flex gap-4">
        <div className="flex flex-col justify-between">
          <FormInputsGroup formVal={formVal} setFormVal={setFormVal} />
          {!!productsOperations.length ? (
            <ProductOperationsList operations={productsOperations} />
          ) : null}
          <Button
            buttonProps={{
              type: "submit",
              style: { width: "100%" },
              disabled: !!mappedParts.size,
            }}
          >
            Add
          </Button>
        </div>
        <PartsSelection
          parts={parts}
          selectionState={mappedParts}
          handleSelection={setMappedParts}
        />
        {!!mappedParts.size ? (
          <OrderSelection
            operations={operations}
            handleSelection={handleSelection}
          />
        ) : null}
      </form>
      {state}
    </div>
  );
}

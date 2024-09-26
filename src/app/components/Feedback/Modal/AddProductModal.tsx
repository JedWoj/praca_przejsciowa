"use client";
import { type HTMLProps, useEffect, useState } from "react";

import { addProduct } from "@/app/actions/add-product-form";
import { parts as partsAPI } from "@/app/api/parts";
import { useFetch } from "@/app/hooks/useFetch";
import PartsSelection from "@/app/products/components/PartsSelection";
import type { MapppedPart } from "@/app/products/utils/convertPartsToArray";
import { useFormState } from "react-dom";
import Button from "../../UI/Button";
import FetchWrapper from "../../UI/FetchWrapper";
import LabelledInput from "../../UI/LabelledInput";

type FormEntry<TVal extends string | number> = {
  label: string;
  value: TVal;
  uniqueName: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  error?: string;
};

type FormEntries = {
  name: FormEntry<string>;
  price: FormEntry<number>;
};

export default function AddProductModal() {
  const [formVal, setFormVal] = useState<FormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    price: {
      label: "Price",
      uniqueName: "price",
      value: 0,
      inputProps: { type: "number" },
    },
  });
  const [parts, setParts] = useState<
    Map<string, MapppedPart & { quantity: number }>
  >(new Map());

  const { fetchData, status, data } = useFetch(partsAPI.get_all);

  const [state, FormAction] = useFormState(addProduct.bind(null, parts), "");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <form action={FormAction} className="flex gap-4">
        <div className="gap-2 flex flex-col">
          {Object.values(formVal).map((entry) => (
            <LabelledInput
              key={entry.uniqueName}
              label={entry.label}
              value={entry.value}
              uniqueName={entry.uniqueName}
              buttonProps={entry.inputProps}
              onChange={(val, name) =>
                setFormVal({
                  ...formVal,
                  [name]: { ...formVal[name as keyof FormEntries], value: val },
                })
              }
            />
          ))}
          <Button
            buttonProps={{ type: "submit", style: { width: "100%" } }}
            handleClick={() => {}}
          >
            Add
          </Button>
        </div>
        <FetchWrapper status={status}>
          <PartsSelection
            parts={data ?? {}}
            selectionState={parts}
            handleSelection={setParts}
          />
        </FetchWrapper>
      </form>
      {state}
    </div>
  );
}

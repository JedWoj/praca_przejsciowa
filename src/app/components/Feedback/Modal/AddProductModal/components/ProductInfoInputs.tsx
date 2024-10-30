"use client";
import LabelledInput from "@/app/components/UI/LabelledInput";
import type { Dispatch, HTMLProps, SetStateAction } from "react";
import type { ProductFormEntries } from "./ProductContainer";

type ProductInfoInputsProps = {
  formVal: ProductFormEntries;
  setFormVal: Dispatch<SetStateAction<ProductFormEntries>>;
};

export type FormEntry<TVal extends string | number> = {
  label: string;
  value: TVal;
  uniqueName: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  error?: string;
};

export default function ProductInfoInputs({
  formVal,
  setFormVal,
}: ProductInfoInputsProps) {
  return (
    <div>
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
              [name]: {
                ...formVal[name as keyof ProductFormEntries],
                value: val,
              },
            })
          }
        />
      ))}
    </div>
  );
}

"use client";
import LabelledInput from "@/app/components/UI/LabelledInput";
import type { FormEntry } from "./types";
import type { Dispatch, SetStateAction } from "react";

type FormInputsGroupProps<
  TValue extends Record<string, FormEntry<string | number>>
> = {
  formVal: TValue;
  setFormVal: Dispatch<SetStateAction<TValue>>;
};

export default function FormInputsGroup<
  TValue extends Record<string, FormEntry<string | number>>
>({ formVal, setFormVal }: FormInputsGroupProps<TValue>) {
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
                ...formVal[name as keyof TValue],
                value: val,
              },
            })
          }
        />
      ))}
    </div>
  );
}

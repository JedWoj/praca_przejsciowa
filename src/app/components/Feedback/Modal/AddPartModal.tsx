"use client";
import { type HTMLProps, useState } from "react";

import { addPart } from "@/app/actions/add-part-form";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import { useFormState } from "react-dom";
import Button from "../../UI/Button";
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

export default function AddPartModal() {
  const [formVal, setFormVal] = useState<FormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    price: {
      label: "Price",
      uniqueName: "price",
      value: 0,
      inputProps: { type: "number" },
    },
  });

  const [state, FormAction] = useFormState(addPart, "");

  useRefreshPageAfterAction({ state, successMessage: SUCCESS_MESSAGES.part });

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
      </form>
      {state}
    </div>
  );
}

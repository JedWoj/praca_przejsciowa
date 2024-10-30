"use client";
import { useState } from "react";

import { addPart } from "@/app/actions/add-part-form";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import { useActionState } from "react";
import Button from "../../UI/Button";
import type { FormEntry } from "./components/types";
import FormInputsGroup from "./components/FormInputsGroup";

export type PartFormEntries = {
  name: FormEntry<string>;
  price: FormEntry<number>;
};

export default function AddPartModal() {
  const [formVal, setFormVal] = useState<PartFormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    price: {
      label: "Price",
      uniqueName: "price",
      value: 0,
      inputProps: { type: "number" },
    },
  });

  const [state, FormAction] = useActionState(addPart, "");

  useRefreshPageAfterAction({ state, successMessage: SUCCESS_MESSAGES.part });

  return (
    <div>
      <form action={FormAction} className="flex gap-4">
        <div className="gap-2 flex flex-col">
          <FormInputsGroup<PartFormEntries>
            formVal={formVal}
            setFormVal={setFormVal}
          />
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

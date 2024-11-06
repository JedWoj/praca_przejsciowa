"use client";
import { addOperation } from "@/app/actions/add-operation-from";
import { useActionState, useState } from "react";
import Button from "../../UI/Button";
import FormInputsGroup from "./components/FormInputsGroup";
import type { FormEntry } from "./components/types";

type OperationFormEntries = {
  name: FormEntry<string>;
  time: FormEntry<number>;
};

export default function AddOperationModal() {
  const [formVal, setFormVal] = useState<OperationFormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    time: {
      label: "Time",
      uniqueName: "time",
      value: 0,
      inputProps: { type: "number" },
    },
  });

  const [state, FormAction] = useActionState(addOperation, "");

  return (
    <section>
      <h2 className="text-center">Add Operation</h2>
      <form action={FormAction} className="flex flex-col items-center gap-4">
        <FormInputsGroup<OperationFormEntries>
          formVal={formVal}
          setFormVal={setFormVal}
        />
        <Button buttonProps={{ type: "submit" }} className="px-4">
          Add
        </Button>
      </form>
      <p aria-live="polite">{state}</p>
    </section>
  );
}

import { useRouter } from "next/navigation";
import { type HTMLProps, type MouseEvent, useState } from "react";

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

export default function AddProductModal() {
  const router = useRouter();
  const [formVal, setFormVal] = useState<FormEntries>({
    name: { label: "Name", uniqueName: "name", value: "" },
    price: {
      label: "Price",
      uniqueName: "price",
      value: 0,
      inputProps: { type: "number" },
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.refresh();
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
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
                  [name]: { ...formVal[name as keyof FormEntries], value: val },
                })
              }
            />
          ))}
        </div>
        <Button buttonProps={{ type: "submit" }} handleClick={handleClick}>
          Add
        </Button>
      </form>
    </div>
  );
}

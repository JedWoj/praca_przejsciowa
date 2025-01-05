"use client";
import Button from "../../UI/Button";
import { useModalContext } from "@/app/context/ModalContext";
import { ChangeEvent, useState, useActionState } from "react";
import { changeItemsInStorage } from "@/app/actions/overview-actions";
import { useTableContext } from "@/app/context/TableContext";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";

export default function ChangeItemModal() {
  const { hide } = useModalContext();
  const { table, refetch } = useTableContext();
  const selectedItems = table
    .getSelectedRowModel()
    .rows?.map((it) => it.original.id)!;

  const [formState, FormAction] = useActionState(
    changeItemsInStorage.bind(null, selectedItems),
    ""
  );

  useRefreshPageAfterAction({
    state: formState,
    successMessage: SUCCESS_MESSAGES.changeItem,
    refetchFunction: refetch,
  });

  const [values, setValues] = useState({
    quantity: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-2xl">Change Item</h2>
      <form action={FormAction}>
        <section className="flex flex-col pb-2">
          <label htmlFor="quantity">Quantity</label>
          <input
            onChange={handleChange}
            className="text-black rounded-sm"
            name="quantity"
            type="number"
            value={values.quantity}
            min={0}
            max={9999999}
          />
        </section>
        <div className="flex justify-around w-full">
          <Button buttonProps={{ type: "submit" }} handleClick={() => {}}>
            <div className="p-1 text-xl">Confirm</div>
          </Button>
          <Button handleClick={hide}>
            <div className="p-1 text-xl">Cancel</div>
          </Button>
        </div>
        <p>{formState}</p>
      </form>
    </div>
  );
}

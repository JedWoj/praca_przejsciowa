"use client";
import Button from "./Button";
import { useModalContext } from "../_context/ModalContext";
import { useFormState } from "react-dom";
import { useState } from "react";
import { useTableContext } from "../_context/TableContext";
import { orderItem } from "../_actions/form-action";

export default function OrderItemModal() {
  const { hide } = useModalContext();
  const { table } = useTableContext();
  const selectedItem = table.getSelectedRowModel().rows.at(0)?.original;
  const [formState, FormAction] = useFormState(
    orderItem.bind(null, selectedItem!),
    ""
  );
  const [orderSize, setOrderSize] = useState<number>();

  const handleIncrement = () => {
    setOrderSize((prev) => (prev ?? 0) + 10);
  };

  const handleDecrement = () => {
    if ((orderSize ?? 0) >= 10) {
      setOrderSize((prev) => (prev ?? 0) - 10);
    }
  };

  const handleReset = () => {
    setOrderSize(0);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h2 className="text-2xl">Order Item</h2>
      <div className="flex gap-5">
        <form className="flex flex-col gap-2" action={FormAction}>
          <label htmlFor="order-size">Order Size</label>
          <input
            type="number"
            onChange={(e) => setOrderSize(Number(e.target.value))}
            value={orderSize}
            className="text-black rounded-sm"
            name="order-size"
            placeholder="Order Size"
            min={0}
            max={9999}
            step={1}
            autoFocus
          />
          <section className="gap-4 flex flex-col">
            <div className="flex gap-2 justify-around">
              <button
                type="button"
                onClick={handleIncrement}
                className="bg-lime-700 p-2 rounded-md"
              >
                +10
              </button>
              <button
                className="bg-red-700 p-2 rounded-md"
                onClick={handleDecrement}
                type="button"
              >
                -10
              </button>
              <button
                type="button"
                className="bg-blue-500 p-2 w-[35px] rounded-md"
                onClick={handleReset}
              >
                0
              </button>
            </div>
            <div className="flex gap-2">
              <Button buttonProps={{ type: "submit" }} handleClick={() => {}}>
                <div className="p-1 text-xl">Confirm</div>
              </Button>
              <Button handleClick={hide}>
                <div className="p-1 text-xl">Cancel</div>
              </Button>
            </div>
          </section>
        </form>
        <section className="bg-white rounded-md text-purple-500 p-2 min-w-48">
          <p>{selectedItem?.name}</p>
          <p>Price per item: {selectedItem?.price}</p>
          <p>Optimal Stock: {selectedItem?.optimalStock}</p>
          <p>
            Stock after order:{" "}
            {(selectedItem?.currentStock ?? 0) + (orderSize ?? 0)}
          </p>
          <p className="text-lg text-red-500 font-bold">
            Order value:{" "}
            {Math.round((orderSize ?? 0) * (selectedItem?.price ?? 0))}
          </p>
        </section>
      </div>
      <p>{formState}</p>
    </div>
  );
}

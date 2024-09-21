"use client";
import Button from "../../UI/Button";
import { useModalContext } from "../../../_context/ModalContext";
import { type FormEvent, useState } from "react";
import { useTableContext } from "../../../_context/TableContext";
import type { ItemForDelivery } from "../../../utils/types";

export default function OrderItemModal() {
  const { hide } = useModalContext();
  const { table, setOrder } = useTableContext();

  const selectedItems = table.getSelectedRowModel().rows;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderSize) return;

    const newItems: ItemForDelivery[] = selectedItems.map((it) => ({
      id: it.original.id,
      currentStock: it.original.currentStock,
      optimalStock: it.original.optimalStock,
      name: it.original.name,
      price: it.original.price,
      location: it.original.location,
      orderSize: orderSize,
    }));

    const newIds = newItems.map((it) => it.id);

    setOrder((prev) =>
      prev !== null
        ? {
            ...prev,
            items: prev.items
              .map((it) =>
                newIds.includes(it.id)
                  ? {
                      ...it,
                      orderSize:
                        it.orderSize +
                        newItems.find((it) => it.id === it.id)?.orderSize!,
                    }
                  : it
              )
              .concat(
                newItems.filter(
                  (it) => !prev.items.map((it) => it.id).includes(it.id)
                )
              ),
          }
        : { name: "", id: crypto.randomUUID(), items: newItems }
    );
    hide();
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h2 className="text-2xl">Order Item</h2>
      <div className="flex gap-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
          <p>{selectedItems?.at(0)?.original.name}</p>
          <p>Price per item: {selectedItems?.at(0)?.original.price}</p>
          <p>Optimal Stock: {selectedItems?.at(0)?.original.optimalStock}</p>
          <p>
            Stock after order:{" "}
            {(selectedItems?.at(0)?.original.currentStock ?? 0) +
              (orderSize ?? 0)}
          </p>
          <p className="text-lg text-red-500 font-bold">
            Order value:{" "}
            {Math.round(
              (orderSize ?? 0) * (selectedItems?.at(0)?.original.price ?? 0)
            )}
          </p>
        </section>
      </div>
    </div>
  );
}

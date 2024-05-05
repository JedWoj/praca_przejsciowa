"use client";
import Button from "./Button";
import { useModalContext } from "../_context/ModalContext";
import { useFormState } from "react-dom";
import { useTableContext } from "../_context/TableContext";
import { ChangeEvent, useState } from "react";
import { addItem } from "../_actions/form-action";

export default function AddItemModal() {
  const { hide } = useModalContext();
  const { table } = useTableContext();
  const selectedItem = table.getSelectedRowModel().rows.at(0)?.original;

  const [formState, FormAction] = useFormState(addItem, "");

  const [values, setValues] = useState({
    name: selectedItem?.name,
    price: selectedItem?.price,
    stock: selectedItem?.currentStock,
    location: selectedItem?.location,
    severity: selectedItem?.severity ?? "0",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-2xl">Add Item</h2>
      <form action={FormAction}>
        <section className="flex flex-col pb-2">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={values.name}
            className="text-black rounded-sm"
            name="name"
          />
          <label htmlFor="stock">Stock</label>
          <input
            onChange={handleChange}
            min={0}
            max={999999}
            step={0.1}
            className="text-black rounded-sm"
            name="stock"
            type="number"
            value={values.stock}
          />
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            min={0}
            max={9999999}
            step={0.1}
            className="text-black rounded-sm"
            name="price"
            type="number"
            value={values.price}
          />
          <label htmlFor="location">Location</label>
          <input
            onChange={handleChange}
            className="text-black rounded-sm"
            name="location"
            type="text"
            value={values.location}
          />
          <fieldset className="flex justify-around">
            <input
              onChange={handleChange}
              name="severity"
              id={"severity-0"}
              type="radio"
              value={0}
              checked={values.severity === "0"}
            />
            <label htmlFor="severity-0">0</label>
            <input
              name="severity"
              id={"severity-1"}
              type="radio"
              value={1}
              onChange={handleChange}
            />
            <label htmlFor="severity-1">1</label>
            <input
              onChange={handleChange}
              name="severity"
              id={"severity-2"}
              type="radio"
              value={2}
            />
            <label htmlFor="severity-2">2</label>
            <input
              onChange={handleChange}
              name="severity"
              id={"severity-3"}
              type="radio"
              value={3}
            />
            <label htmlFor="severity-3">3</label>
          </fieldset>
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

"use client";
import Button from "../../UI/Button";
import { useModalContext } from "@/app/context/ModalContext";
import { ChangeEvent, useState, useActionState } from "react";
import { addItem } from "@/app/actions/form-action";

export default function AddItemModal() {
  const { hide } = useModalContext();

  const [formState, FormAction] = useActionState(addItem, "");

  const [values, setValues] = useState({
    "item-name": "",
    price: undefined,
    stock: 0,
    optimalStock: undefined,
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
      <h2 className="text-2xl">Add Item</h2>
      <form action={FormAction}>
        <section className="flex flex-col pb-2">
          <label htmlFor="item-name">Name</label>
          <input
            onChange={handleChange}
            value={values["item-name"]}
            className="text-black rounded-sm"
            name="item-name"
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
          <label htmlFor="optimal-stock">Optimal Stock</label>
          <input
            onChange={handleChange}
            className="text-black rounded-sm"
            name="optimal-stock"
            type="number"
            value={values.optimalStock}
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

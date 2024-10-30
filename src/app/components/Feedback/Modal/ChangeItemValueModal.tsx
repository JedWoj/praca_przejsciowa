"use client";
import { changeItem } from "@/app/actions/form-action";
import { useModalContext } from "@/app/context/ModalContext";
import { useTableContext } from "@/app/context/TableContext";
import { type ChangeEvent, useActionState, useState } from "react";
import Button from "../../UI/Button";

export default function ChangeItemValueModal() {
  const { hide } = useModalContext();
  const { table } = useTableContext();
  const selectedItem = table.getSelectedRowModel().rows.at(0)?.original!;

  const [formState, FormAction] = useActionState(
    changeItem.bind(null, selectedItem),
    ""
  );

  const [values, setValues] = useState({
    "item-name": selectedItem?.name,
    price: selectedItem?.price,
    "optimal-stock": selectedItem?.optimalStock,
    location: selectedItem?.location,
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
      <h2 className="text-2xl">Change Value</h2>
      <form action={FormAction}>
        <section className="flex flex-col pb-2">
          <label htmlFor="item-name">Name</label>
          <input
            onChange={handleChange}
            value={values["item-name"]}
            className="text-black rounded-sm"
            name="item-name"
          />
          <label htmlFor="optimal-stock">Optimal Stock</label>
          <input
            onChange={handleChange}
            min={0}
            max={999999}
            step={1}
            className="text-black rounded-sm"
            name="optimal-stock"
            type="number"
            value={values["optimal-stock"]}
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
          <div className="flex flex-col mb-4">
            <label htmlFor="location">Location</label>
            <select
              value={values.location}
              onChange={handleChange}
              className="text-black"
              name="location"
              id="location"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
            </select>
          </div>
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

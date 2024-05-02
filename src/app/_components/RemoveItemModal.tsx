"use client";
import Button from "./Button";
import { removeDataFromDB } from "../_actions/db-actions";
import { useModalContext } from "../_context/ModalContext";

export default function RemoveItemModal() {
  const { toggle } = useModalContext();

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-2xl">Do you want to remove this item?</h2>
      <div className="flex justify-around w-full">
        <Button handleClick={removeDataFromDB.bind(null, "/items/22")}>
          <div className="p-1 text-xl">Confirm</div>
        </Button>
        <Button handleClick={toggle}>
          <div className="p-1 text-xl">Cancel</div>
        </Button>
      </div>
    </div>
  );
}

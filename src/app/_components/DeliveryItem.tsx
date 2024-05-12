"use client";
import { useModalContext } from "../_context/ModalContext";
import type { Item } from "../utils/types";
import Button from "./Button";

type DeliveryItemProps = {
  item: Item;
};

export default function DeliveryItem({ item }: DeliveryItemProps) {
  const { displayModal } = useModalContext();
  return (
    <div className="flex bg-white rounded gap-4 items-center p-2 justify-between">
      <div className="flex gap-5">
        <p>{item.name}</p>
        <p>Stock: {item.currentStock}</p>
      </div>
      <div className="flex gap-5">
        <Button handleClick={() => displayModal("dispatch_item")}>
          Dispatch item
        </Button>
        <Button handleClick={() => displayModal("return_item")}>
          Return Item
        </Button>
      </div>
    </div>
  );
}

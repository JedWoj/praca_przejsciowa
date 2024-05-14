"use client";
import { usePathname } from "next/navigation";
import { useDeliveryContext } from "../_context/DeliveryContext";
import { useModalContext } from "../_context/ModalContext";
import type { ItemForDelivery } from "../utils/types";
import Button from "./Button";
import { removeDataFromDB, updateDataToDB } from "../_actions/db-actions";
import { removeDelivery } from "../_actions/delivery-actions";

type DeliveryItemProps = {
  item: ItemForDelivery;
};

export default function DeliveryItem({ item }: DeliveryItemProps) {
  const { displayModal } = useModalContext();
  const { deliveries } = useDeliveryContext();
  const pathname = usePathname();
  const deliveryId = pathname.split("/").at(-1);
  const handledDelivery = deliveries.find((it) => it.id === deliveryId);

  const handledItem = handledDelivery?.items.find((it) => it.id === item.id)!;

  const handleReturn = () => {
    const updatedDeliveryItems = handledDelivery?.items.filter(
      (it) => it.id !== handledItem.id
    );

    if (!updatedDeliveryItems?.length) {
      removeDelivery(`/deliveries/${handledDelivery?.id}`);
      return;
    }

    updateDataToDB(`/deliveries/${handledDelivery?.id}`, {
      ...handledDelivery,
      items: updatedDeliveryItems,
    });
  };

  return (
    <div className="flex bg-white rounded gap-4 items-center p-2 justify-between">
      <div className="flex gap-5">
        <p>{item.name}</p>
        <p>Stock: {item.currentStock}</p>
        <p>Order size: {item.orderSize}</p>
      </div>
      <div className="flex gap-5">
        <Button handleClick={() => displayModal("dispatch_item")}>
          Dispatch item
        </Button>
        <Button handleClick={handleReturn}>Return Item</Button>
      </div>
    </div>
  );
}

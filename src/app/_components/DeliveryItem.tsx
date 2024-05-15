"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDeliveryContext } from "../_context/DeliveryContext";
import type { ItemForDelivery, Location } from "../utils/types";
import Button from "./Button";
import { updateDataToDB } from "../_actions/db-actions";
import { removeDelivery } from "../_actions/delivery-actions";
import { convertDate } from "../utils/convertDate";

type DeliveryItemProps = {
  item: ItemForDelivery;
};

export default function DeliveryItem({ item }: DeliveryItemProps) {
  const { deliveries } = useDeliveryContext();
  const pathname = usePathname();
  const deliveryId = pathname.split("/").at(-1);
  const handledDelivery = deliveries.find((it) => it.id === deliveryId);
  const handledItem = handledDelivery?.items.find((it) => it.id === item.id)!;
  const [location, setLocation] = useState<Location | "SELECT">(
    handledItem.location ?? "SELECT"
  );

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

  const handleDispatch = () => {
    const updatedDeliveryItems = handledDelivery?.items.filter(
      (it) => it.id !== handledItem.id
    );

    updateDataToDB(`/items/${handledItem.id}`, {
      ...handledItem,
      currentStock: handledItem.currentStock + handledItem.orderSize,
      location,
      lastOrder: convertDate(new Date()),
    });

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
        <p>Current Location: {item.location ?? "NO LOCATION"}</p>
      </div>
      <div className="flex gap-5 items-center">
        <label>Change Location</label>
        <select
          onChange={(e) => setLocation(e.target.value as Location)}
          name="item-location"
          value={location}
        >
          <option disabled selected value={"SELECT"}>
            location
          </option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
        </select>
        <Button
          buttonProps={{ disabled: location === "SELECT" }}
          handleClick={handleDispatch}
        >
          Dispatch item
        </Button>
        <Button handleClick={handleReturn}>Return Item</Button>
      </div>
    </div>
  );
}

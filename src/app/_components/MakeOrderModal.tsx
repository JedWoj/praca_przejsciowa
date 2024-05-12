"use client";
import { FaTrashCan } from "react-icons/fa6";
import { useTableContext } from "../_context/TableContext";
import type { ItemForDelivery } from "../utils/types";
import Button from "./Button";
import { useModalContext } from "../_context/ModalContext";
import { addDelivery } from "../_actions/delivery-actions";

export function MakeOrderModal() {
  const { order, setOrder } = useTableContext();
  const { hide } = useModalContext();

  const handleClearAll = () => {
    setOrder(null);
    hide();
  };

  const handleDelivery = () => {
    if (order) {
      addDelivery(order);
      hide();
      setOrder(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Make An order</h2>
      <div className="flex flex-col">
        <label htmlFor="order-name">Order name:</label>
        <input
          className="text-purple-400 rounded-sm p-1"
          value={order?.name ?? ""}
          onChange={(e) =>
            setOrder((prev) =>
              prev ? { ...prev, name: e.target.value } : prev
            )
          }
          placeholder="name"
          name="order-name"
        />
      </div>
      <ul className="flex flex-col gap-2">
        {order?.items.map((it) => (
          <OrderItem item={it} key={it.id} />
        ))}
      </ul>
      <div className="flex justify-around gap-2">
        <Button
          buttonProps={{ disabled: !order?.name }}
          handleClick={handleDelivery}
        >
          Confirm
        </Button>
        <Button handleClick={hide}>Cancel</Button>
        <Button handleClick={handleClearAll}>Clear All</Button>
      </div>
    </div>
  );
}

function OrderItem({ item }: { item: ItemForDelivery }) {
  const { setOrder } = useTableContext();

  const removeItemFromOrder = () => {
    setOrder((prev) =>
      prev !== null
        ? { ...prev, items: prev.items.filter((it) => it.id !== item.id) }
        : prev
    );
  };

  return (
    <li className="flex gap-2 justify-between">
      <p>{item.name}</p>
      <div className="flex">
        <Button handleClick={removeItemFromOrder}>
          <FaTrashCan />
        </Button>
      </div>
    </li>
  );
}

import { FaTrashCan } from "react-icons/fa6";
import { useTableContext } from "../_context/TableContext";
import type { ItemForDelivery } from "../utils/types";
import Button from "./Button";
import { useModalContext } from "../_context/ModalContext";

export function MakeOrderModal() {
  const { order } = useTableContext();
  const { hide } = useModalContext();

  return (
    <div>
      <h2>Make An order</h2>
      <ul>
        {order?.items.map((it) => (
          <OrderItem item={it} key={it.id} />
        ))}
      </ul>
      <Button handleClick={() => console.log("sdasd")}>Confirm</Button>
      <Button handleClick={hide}>Cancel</Button>
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
    <li className="flex gap-2">
      <p>{item.name}</p>
      <div className="flex">
        <Button handleClick={removeItemFromOrder}>
          <FaTrashCan />
        </Button>
      </div>
    </li>
  );
}

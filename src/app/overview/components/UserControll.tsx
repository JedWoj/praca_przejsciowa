"use client";
import { useState } from "react";
import { useTableContext } from "@/app/context/TableContext";
import { useModalContext } from "@/app/context/ModalContext";
import Button from "@/app/components/UI/Button";
import { FaShoppingCart } from "react-icons/fa";

export function UserControll() {
  const [filter, setFilter] = useState<string>("");
  const { table, order } = useTableContext();
  const { displayModal } = useModalContext();

  const numberOfSelectedItems = table.getSelectedRowModel().rows.length;

  return (
    <section className="flex p-4 gap-4">
      <input
        value={filter}
        placeholder="Filter items"
        onChange={(e) => {
          table.setGlobalFilter(e.target.value);
          setFilter(e.target.value);
        }}
      />
      <Button handleClick={() => displayModal("add_item")}>Add Item</Button>
      <Button
        handleClick={() => displayModal("remove_item")}
        buttonProps={{ disabled: !numberOfSelectedItems }}
      >
        Remove Item
      </Button>
      <Button
        handleClick={() => displayModal("change_value")}
        buttonProps={{ disabled: numberOfSelectedItems !== 1 }}
      >
        Change Item
      </Button>
      <Button
        handleClick={() => displayModal("order_item")}
        buttonProps={{ disabled: !numberOfSelectedItems }}
      >
        Order Item
      </Button>
      <button
        disabled={!order || !order.items.length}
        className={`rounded-full w-12 h-12 text-white flex justify-center items-center ml-auto relative ${
          !order || !order.items.length
            ? "bg-slate-500"
            : "bg-gradient-to-r from-blue-500 to-green-600 "
        }`}
        onClick={() => displayModal("make_order")}
      >
        <div className="absolute top-[-15%] right-[-15%] rounded-full bg-orange-500 w-6">
          {order?.items.length ?? 0}
        </div>
        <FaShoppingCart fontSize={19} />
      </button>
    </section>
  );
}

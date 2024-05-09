"use client";
import { useState } from "react";
import { useTableContext } from "../_context/TableContext";
import { useModalContext } from "../_context/ModalContext";
import Button from "./Button";

export function UserControll() {
  const [filter, setFilter] = useState<string>("");
  const { table } = useTableContext();
  const { displayModal } = useModalContext();

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
        buttonProps={{ disabled: !table.getIsSomeRowsSelected() }}
      >
        Remove Item
      </Button>
      <Button
        handleClick={() => displayModal("change_value")}
        buttonProps={{ disabled: !table.getIsSomeRowsSelected() }}
      >
        Change Item
      </Button>
      <Button
        handleClick={() => displayModal("order_item")}
        buttonProps={{ disabled: !table.getIsSomeRowsSelected() }}
      >
        Order Item
      </Button>
    </section>
  );
}

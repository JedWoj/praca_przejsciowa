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
    <section className="flex justify-around p-4">
      <input
        value={filter}
        onChange={(e) => {
          table.setGlobalFilter(e.target.value);
          setFilter(e.target.value);
        }}
      />
      <Button handleClick={() => displayModal("add_item")}>+ Add</Button>
    </section>
  );
}

"use client";
import { useState } from "react";
import { useTableContext } from "@/app/context/TableContext";
import { useModalContext } from "@/app/context/ModalContext";
import Button from "@/app/components/UI/Button";

export function UserControll() {
  const [filter, setFilter] = useState<string>("");
  const { table } = useTableContext();
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
      <Button
        buttonProps={{ disabled: !numberOfSelectedItems }}
        handleClick={() => displayModal("change_item")}
      >
        Change Item
      </Button>
      <Button
        handleClick={() => displayModal("remove_item")}
        buttonProps={{ disabled: !numberOfSelectedItems }}
      >
        Remove Item
      </Button>
    </section>
  );
}

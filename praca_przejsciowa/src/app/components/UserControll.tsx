"use client";
import { useState } from "react";
import { useTableContext } from "../context/TableContext";

export function UserControll() {
  const [filter, setFilter] = useState<string>("");
  const { table } = useTableContext();

  return (
    <section>
      <button>Show Critical</button>
      <input
        value={filter}
        onChange={(e) => {
          table.setGlobalFilter(e.target.value);
          setFilter(e.target.value);
        }}
      />
    </section>
  );
}

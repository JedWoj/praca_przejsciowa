"use client";
import { type Row, flexRender } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type { StorageItem } from "../../utils/types";
import type { MouseEvent } from "react";
import { useMenuContext } from "../../context/MenuContext";
import { useTableContext } from "../../context/TableContext";

type TableRowProps = {
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  row: Row<StorageItem>;
};

export function TableRow({ virtualRow, rowVirtualizer, row }: TableRowProps) {
  const { set } = useMenuContext();
  const { table } = useTableContext();

  const handleContextMenu = (e: MouseEvent<HTMLTableRowElement>) => {
    handleRowSelection();
    e.preventDefault();
    set({ isVisible: true, cords: { x: e.clientX, y: e.clientY } });
  };

  const handleRowSelection = () => {
    table.setRowSelection({ [row.id]: true });
  };

  const getRowColor = (row: Row<StorageItem>) => {
    if (row.getIsSelected()) {
      return "bg-slate-50";
    }

    return row.getValue("type") === "product" ? "bg-green-300" : "bg-blue-300";
  };

  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
      }}
      className={`flex absolute w-full hover:bg-zinc-300 ${getRowColor(
        row
      )} cursor-pointer`}
      onContextMenu={handleContextMenu}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            style={{
              display: "flex",
              width: cell.column.getSize(),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}

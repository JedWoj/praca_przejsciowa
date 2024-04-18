import { type Row, flexRender, Table } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type { Item } from "../utils/types";
import type { MouseEvent } from "react";
import { useMenuContext } from "../context/MenuContext";
import { useTableContext } from "../context/TableContext";

type TableRowProps = {
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  row: Row<Item>;
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
    table.resetRowSelection();
    row.toggleSelected();
  };

  const getRowColor = (row: Row<Item>) => {
    if (row.getIsSelected()) {
      return "bg-slate-50";
    }

    let color;
    switch (row.original.severity) {
      case 0:
        color = "bg-lime-600";
        break;
      case 1:
        color = "bg-amber-300";
        break;
      case 2:
        color = "bg-amber-700";
        break;
      case 3:
        color = "bg-red-700";
        break;
      default:
        color = "bg-lime-600";
        break;
    }

    return color;
  };

  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
      }}
      onClick={handleRowSelection}
      className={`flex absolute w-full hover:bg-zinc-300 ${getRowColor(row)}`}
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

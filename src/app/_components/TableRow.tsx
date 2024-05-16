import { type Row, flexRender } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type { Item } from "../utils/types";
import type { MouseEvent } from "react";
import { useMenuContext } from "../_context/MenuContext";
import { useTableContext } from "../_context/TableContext";

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
    table.setRowSelection({ [row.id]: true });
  };

  const getRowColor = (row: Row<Item>) => {
    if (row.getIsSelected()) {
      return "bg-slate-50";
    }

    const percentOfOptimalValue =
      (row.original.currentStock / row.original.optimalStock) * 100;

    if (percentOfOptimalValue > 75) {
      return "bg-lime-600";
    } else if (percentOfOptimalValue > 50) {
      return "bg-amber-300";
    } else if (percentOfOptimalValue > 25) {
      return "bg-amber-700";
    } else if (percentOfOptimalValue > 0) {
      return "bg-red-700";
    } else if (percentOfOptimalValue === 0) {
      return "bg-slate-600";
    }
  };

  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
      }}
      // onClick={handleRowSelection}
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

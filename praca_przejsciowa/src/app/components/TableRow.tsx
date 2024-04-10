import { type Row, flexRender } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type { Item } from "../utils/types";
import type { MouseEvent } from "react";
import { useMenuContext } from "../context/MenuContext";

type TableRowProps = {
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  row: Row<Item>;
};

export function TableRow({ virtualRow, rowVirtualizer, row }: TableRowProps) {
  const { set } = useMenuContext();

  const handleContextMenu = (e: MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    set({ isVisible: true, cords: { x: e.clientX, y: e.clientY } });
  };

  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
      }}
      className="flex absolute w-full"
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

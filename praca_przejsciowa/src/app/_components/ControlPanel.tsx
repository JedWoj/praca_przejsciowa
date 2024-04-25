import { PropsWithChildren } from "react";
import { MenuContext } from "../_context/MenuContext";
import { TableContext } from "../_context/TableContext";
import type { Item } from "../utils/types";
import { Table } from "./Table";
import { UserControll } from "./UserControll";

type ControlPanelProps = PropsWithChildren<{
  data: Item[];
}>;

export default function ControlPanel({ data, children }: ControlPanelProps) {
  return (
    <TableContext items={data.filter(Boolean)}>
      <MenuContext>
        <UserControll />
        <Table />
        {children}
      </MenuContext>
    </TableContext>
  );
}

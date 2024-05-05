import type { PropsWithChildren } from "react";
import { MenuContext } from "../_context/MenuContext";
import { TableContext } from "../_context/TableContext";
import { Table } from "./Table";
import { UserControll } from "./UserControll";

export default function ControlPanel({ children }: PropsWithChildren) {
  return (
    <TableContext>
      <MenuContext>
        <UserControll />
        <Table />
        {children}
      </MenuContext>
    </TableContext>
  );
}

"use client";
import { TableContext } from "../context/TableContext";
import type { Item } from "../utils/types";
import { Table } from "./Table";
import { UserControll } from "./UserControll";

type ControlPanelProps = {
  data: Item[];
};

export default function ControlPanel({ data }: ControlPanelProps) {
  return (
    <TableContext items={data.filter(Boolean)}>
      <UserControll />
      <Table />
    </TableContext>
  );
}

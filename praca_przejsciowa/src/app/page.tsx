"use client";
import { Table } from "./components/Table";
import { UserControll } from "./components/UserControll";
import { TableContext } from "./context/TableContext";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <TableContext>
        <UserControll />
        <Table />
      </TableContext>
    </main>
  );
}

import type { PropsWithChildren } from "react";
import { Table } from "./Table";
import { UserControll } from "./UserControll";

export default function ControlPanel({ children }: PropsWithChildren) {
  return (
    <>
      <UserControll />
      <Table />
      {children}
    </>
  );
}

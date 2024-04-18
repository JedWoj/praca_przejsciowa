import {
  RowSelectionState,
  SortingState,
  type Table,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Item } from "../utils/types";

export type TableContextType = {
  table: Table<Item>;
};

type TableContextProps = PropsWithChildren<{ items: Item[] }>;

const Context = createContext<TableContextType | null>(null);

const columnHelper = createColumnHelper<Item>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.currentStock, {
    id: "currentStock",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Current Stock</span>,
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("lastOrder", {
    header: () => <span>Last Order</span>,
  }),
  columnHelper.accessor("location", {
    header: "Location",
  }),
  columnHelper.accessor("severity", {
    header: "Severity",
  }),
];

const TableContext = ({ children, items }: TableContextProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [data, setData] = useState<Item[]>(() => items);

  const table = useReactTable({
    data,
    columns,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
  });

  const value = {
    table,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useTableContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error("The TableContext is missing or initial state is falsy");
  }

  return ctx;
};

export { TableContext, useTableContext };

"use client";
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
import React, {
  HTMLProps,
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Item } from "../utils/types";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

export type TableContextType = {
  table: Table<Item>;
};

type TableContextProps = PropsWithChildren;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

initializeApp(firebaseConfig);

const Context = createContext<TableContextType | null>(null);

const columnHelper = createColumnHelper<Item>();

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.currentStock, {
    id: "currentStock",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Current Stock</span>,
  }),
  columnHelper.accessor("optimalStock", {
    id: "optimalStock",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Optimal Stock</span>,
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("lastOrder", {
    header: () => <span>Last Change</span>,
    minSize: 200,
  }),
  columnHelper.accessor("location", {
    header: "Location",
  }),
];

const TableContext = ({ children }: TableContextProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const userDataRef = ref(db, "/items");

    const subscription = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setData(Object.values(data));
      } else {
        setData([]);
      }
    });

    () => subscription();
  }, []);

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
    setData,
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

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

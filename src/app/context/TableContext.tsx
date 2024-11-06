"use client";
import { Prisma } from "@prisma/client";
import {
  RowSelectionState,
  SortingState,
  type Table,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  type Dispatch,
  type HTMLProps,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Delivery, Item } from "../utils/types";

export type TableContextType = {
  table: Table<Item>;
  order: Delivery | null;
  setOrder: Dispatch<SetStateAction<Delivery | null>>;
  data: Item[];
};

type TableContextProps = PropsWithChildren;

const Context = createContext<TableContextType | null>(null);

const columnHelper = createColumnHelper<Item>();

const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: any }) => (
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

type Storage = Prisma.StorageGetPayload<{
  include: {
    _count: true;
    parts: { include: { part: true } };
    products: { include: { product: true } };
  };
}>;

const TableContext = ({ children }: TableContextProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [data, setData] = useState<Item[]>([]);
  const [order, setOrder] = useState<null | Delivery>(null);
  const [storage, setStorage] = useState<null | { data: Storage[] }>(null);

  const storageItems: Item[] = useMemo(
    () =>
      storage?.data.flatMap(
        (it) =>
          it.parts
            ?.map((it) => ({
              currentStock: it.quantity,
              id: it.id,
              lastOrder: String(it.updatedAt),
              location: "A1" as const,
              name: it.id,
              optimalStock: 100,
              price: 100,
            }))
            .concat(
              it.products.map((prod) => ({
                currentStock: prod.quantity,
                id: prod.id,
                lastOrder: String(prod.updatedAt),
                location: "A1",
                name: prod.id,
                optimalStock: 100,
                price: 100,
              }))
            ) || []
      ) ?? [],
    [storage]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/storage");
      const res = await data.json();
      setStorage(res);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data: storageItems,
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
    order,
    setOrder,
    table,
    setData,
    data,
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
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

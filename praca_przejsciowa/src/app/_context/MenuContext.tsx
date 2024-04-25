"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  type PropsWithChildren,
  type SetStateAction,
  type Dispatch,
} from "react";
import { ContextMenu } from "../_components/ContextMenu";
import { ContextMenuItem } from "../_components/ContextMenuItem";
import { useTableContext } from "./TableContext";
import { useModalContext } from "./ModalContext";

export type MenuContextType = {
  set: Dispatch<SetStateAction<MenuContextStateType>>;
  reset: () => void;
} & MenuContextStateType;

type MenuContextStateType = {
  isVisible: boolean;
  cords: {
    x: number | null;
    y: number | null;
  };
};

type MenuContextProps = PropsWithChildren<{
  initialState?: MenuContextStateType;
}>;

const Context = createContext<MenuContextType | null>(null);

const initial_state: MenuContextStateType = {
  isVisible: false,
  cords: {
    x: null,
    y: null,
  },
};

const MenuContext = ({
  children,
  initialState = initial_state,
}: MenuContextProps) => {
  const [state, setState] = useState<MenuContextStateType>(initialState);
  const { table } = useTableContext();
  const { toggle } = useModalContext();

  const selectedItem = table.getSelectedRowModel().rows.at(0);

  const value = useMemo(() => {
    return {
      ...state,
      set: setState,
      reset: () => {
        setState(initial_state);
      },
    };
  }, [state]);

  return (
    <Context.Provider value={value}>
      {children}
      <ContextMenu {...value}>
        <ContextMenuItem action={toggle}>Remove Item</ContextMenuItem>
        <ContextMenuItem action={() => console.log(selectedItem)}>
          Change Value
        </ContextMenuItem>
        <ContextMenuItem action={() => console.log(selectedItem)}>
          Change Severity
        </ContextMenuItem>
        <ContextMenuItem action={() => console.log(selectedItem)}>
          To be Determined
        </ContextMenuItem>
      </ContextMenu>
    </Context.Provider>
  );
};

const useMenuContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error("The MenuContext is missing or initial state is falsy");
  }

  return ctx;
};

export { MenuContext, useMenuContext };

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
import { ContextMenu } from "../_components/UI/ContextMenu/ContextMenu";
import { ContextMenuItem } from "../_components/UI/ContextMenu/ContextMenuItem";
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
  const { displayModal } = useModalContext();

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
        <ContextMenuItem action={() => displayModal("remove_item")}>
          Remove Item
        </ContextMenuItem>
        <ContextMenuItem action={() => displayModal("change_value")}>
          Change Value
        </ContextMenuItem>
        <ContextMenuItem action={() => displayModal("order_item")}>
          Order Item
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

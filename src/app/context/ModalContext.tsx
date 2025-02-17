"use client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ModalContextType = {
  hide: () => void;
  displayModal: Dispatch<SetStateAction<ModalName | null>>;
  modal: ModalName | null;
};

type ModalName =
  | "remove_item"
  | "change_item"
  | "order_item"
  | "make_order"
  | "add_product"
  | "add_part";

type ModalContextProps = PropsWithChildren;

const Context = createContext<ModalContextType | null>(null);

export default function ModalContext({ children }: ModalContextProps) {
  const [displayedModal, setDisplayedModal] = useState<ModalName | null>(null);

  const hide = useCallback(() => {
    setDisplayedModal(null);
  }, [setDisplayedModal]);

  const value = useMemo<ModalContextType>(
    () => ({
      modal: displayedModal,
      displayModal: setDisplayedModal,
      hide,
    }),
    [hide, setDisplayedModal, displayedModal]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useModalContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error("The ModalContext is missing or initial state is falsy");
  }

  return ctx;
};

export { ModalContext, useModalContext };

"use client";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useToggle } from "../hooks/useToggle";

type ModalContextType = {
  toggle: () => void;
  isVisible: boolean;
};

type ModalContextProps = PropsWithChildren;

const Context = createContext<ModalContextType | null>(null);

export default function ModalContext({ children }: ModalContextProps) {
  const [isVisible, toggle] = useToggle(false);

  const value = useMemo(
    () => ({
      isVisible,
      toggle,
    }),
    [isVisible, toggle]
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

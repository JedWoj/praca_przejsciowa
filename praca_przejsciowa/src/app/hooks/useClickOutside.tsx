"use client";
import { useEffect, useRef, type MutableRefObject } from "react";

type UseClickOutsideConfig = {
  onOutside: () => void;
};

type UseClickOutsideReturn<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
};

const assertIsNode = (target: Node | EventTarget | null): target is Node => {
  return !!target && "nodeType" in target;
};

export function useClickOutside<T extends HTMLElement>({
  onOutside,
}: UseClickOutsideConfig): UseClickOutsideReturn<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      (assertIsNode(target) && ref.current?.contains(target)) || onOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref };
}

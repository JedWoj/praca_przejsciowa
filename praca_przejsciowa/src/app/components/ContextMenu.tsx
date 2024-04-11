import type { PropsWithChildren } from "react";
import type { MenuContextType } from "../context/MenuContext";
import { useClickOutside } from "../hooks/useClickOutside";

export function ContextMenu({
  cords,
  isVisible,
  reset,
  children,
}: PropsWithChildren<MenuContextType>) {
  const { ref } = useClickOutside<HTMLUListElement>({
    onOutside: reset,
  });

  return (
    <ul
      ref={ref}
      style={{
        top: cords.y ?? 0,
        left: cords.x ?? 0,
        display: isVisible ? "block" : "none",
      }}
      className="absolute bg-gray-500 text-white text-lg min-w-52"
    >
      {children}
    </ul>
  );
}

type ContextMenuItemProps = PropsWithChildren<{}>;

export function ContextMenuItem({ children }: ContextMenuItemProps) {
  return (
    <li className="p-4 border-b-2 hover:bg-slate-400 cursor-pointer">
      {children}
    </li>
  );
}

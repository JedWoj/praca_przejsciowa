import type { PropsWithChildren } from "react";
import { useMenuContext } from "../_context/MenuContext";

type ContextMenuItemProps = PropsWithChildren<{ action: () => void }>;

export function ContextMenuItem({ children, action }: ContextMenuItemProps) {
  const { reset } = useMenuContext();

  const handleClick = () => {
    action();
    reset();
  };

  return (
    <li
      onClick={handleClick}
      className="p-4 border-b-2 hover:bg-slate-400 cursor-pointer"
    >
      {children}
    </li>
  );
}

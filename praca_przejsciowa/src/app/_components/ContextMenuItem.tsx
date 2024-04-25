import type { PropsWithChildren } from "react";

type ContextMenuItemProps = PropsWithChildren<{ action: () => void }>;

export function ContextMenuItem({ children, action }: ContextMenuItemProps) {
  return (
    <li
      onClick={action}
      className="p-4 border-b-2 hover:bg-slate-400 cursor-pointer"
    >
      {children}
    </li>
  );
}

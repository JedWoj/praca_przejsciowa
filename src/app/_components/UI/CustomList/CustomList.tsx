"use client";
import type { CustomListProps, ItemBase } from "./types";

function DefaultListItem({ name }: ItemBase) {
  return <li key={name}>{name}</li>;
}

export function CustomList<T extends ItemBase>({
  children,
  listItems,
  footer,
  header,
  onClick,
}: CustomListProps<T>) {
  return (
    <div>
      {header}
      <ul onClick={onClick}>
        {listItems.map((item, index) =>
          children({ item, index, ListItem: DefaultListItem })
        )}
      </ul>
      {footer}
    </div>
  );
}

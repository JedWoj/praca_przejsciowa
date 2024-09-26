"use client";
import type { CustomListProps, ItemBase } from "./types";

function DefaultListItem({ name }: ItemBase) {
  return <li key={name}>{name}</li>;
}

export default function CustomList<T extends ItemBase>({
  children,
  listItems,
  footer,
  header,
  onClick,
  ...props
}: CustomListProps<T>) {
  return (
    <div>
      {header}
      <ul {...props} onClick={onClick}>
        {listItems.map((item, index) =>
          children({ item, index, ListItem: DefaultListItem }),
        )}
      </ul>
      {footer}
    </div>
  );
}

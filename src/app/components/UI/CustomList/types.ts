import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type ItemBase = {
  name: string;
};

export type ListItemInjectedProps<T extends ItemBase> = {
  item: T;
  index: number;
  ListItem: (props: T) => JSX.Element;
};

export type CustomListProps<T extends ItemBase> = ListContainerProps & {
  listItems: T[];
  children: (props: ListItemInjectedProps<T>) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

type NativeContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

type ListContainerProps = Omit<NativeContainerProps, "children">;

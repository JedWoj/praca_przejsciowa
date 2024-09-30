import type { PropsWithChildren, ReactNode } from "react";
import ShoppingCartBtn from "./components/ShoppingCart/ShoppingCartBtn";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      {children}
      <ShoppingCartBtn />
    </div>
  );
}

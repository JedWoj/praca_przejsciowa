import Link from "next/link";
import type { Product } from "../types";
import OrderProductBtns from "./OrderProductBtns";

type ProductBtnsProps = {
  product: Product;
};

export default function ProductBtns({ product }: ProductBtnsProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Link
        className="text-sm bg-white text-cyan-400 p-1.5 rounded-md"
        href={`/products/${product.id}`}
      >
        Product details
      </Link>
      <OrderProductBtns product={product} />
    </div>
  );
}

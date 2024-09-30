import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartItemsCounter from "./ShoppingCartItemsCounter";

export default function ShoppingCartBtn() {
  return (
    <Link
      href={"/products/cart"}
      className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full cursor-pointer flex justify-center items-center"
    >
      <ShoppingCartItemsCounter />
      <FaShoppingCart className="text-white text-4xl" />
    </Link>
  );
}

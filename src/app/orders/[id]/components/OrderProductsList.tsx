import type { Order } from "@/app/api/orders/models/Order";
import type { Product } from "@/app/products/types";

type OrderProductsListProps = {
  order: Order;
  products: Product[];
};

export function OrderProductsList({ order, products }: OrderProductsListProps) {
  return (
    <ul className="flex-col flex gap-2 mt-4 grow overflow-y-auto">
      {products.map((product) => {
        const productQuantity =
          order.products.find((prod) => prod.id === product.id)?.quantity ?? 0;

        return (
          <li className="bg-green-400 p-2 rounded-md" key={product.id}>
            <p>Product Info:</p>
            <p>Name: {product.name}</p>
            <p>Single Product Price: {product.price}</p>
            <p>
              Quantity:{" "}
              {order.products.find((prod) => prod.id === product.id)?.quantity}
            </p>
            <p>Total Price: {productQuantity * product.price}</p>
          </li>
        );
      })}
    </ul>
  );
}

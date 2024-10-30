import { getOrder } from "./utils/getOrder";

type OrderProductsListProps = {
  id: string;
};

export async function OrderProductsList({ id }: OrderProductsListProps) {
  const order = await getOrder(id);

  return (
    <ul className="flex-col flex gap-2 mt-4 grow overflow-y-auto">
      {order?.products.map((it) => (
        <li className="bg-green-400 p-2 rounded-md" key={it.product.id}>
          <p>Product Info:</p>
          <p>Name: {it.product.name}</p>
          <p>Single Product Price: {it.product.price}</p>
          <p>Quantity: {it.quantity}</p>
          <p>Total Price: {it.product.price * it.quantity}</p>
        </li>
      ))}
    </ul>
  );
}

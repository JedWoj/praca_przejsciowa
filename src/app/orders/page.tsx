import { orders } from "../api/orders";

export default async function OrdersPage() {
  const data = await orders.get();

  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center">
      {Object.keys(data).map((id) => (
        <div key={id}>Order: {id}</div>
      ))}
    </div>
  );
}

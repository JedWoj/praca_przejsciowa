import { orders } from "../api/orders";
import { OrderPreview } from "./components/OrderPreview";

export default async function OrdersPage() {
  const data = await orders.get_all();

  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center">
      <ul className="flex-col">
        {Object.entries(data).map(([id, data]) => (
          <OrderPreview key={id} order={{ [id]: data }} />
        ))}
      </ul>
    </div>
  );
}

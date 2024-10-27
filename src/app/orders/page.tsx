import prisma from "@/lib/db";
import { OrderPreview } from "./components/OrderPreview";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany();

  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center bg-blue-400">
      <ul className="flex-col">
        {orders.map((order) => (
          <OrderPreview key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

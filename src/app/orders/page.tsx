import prisma from "@/lib/db";
import { OrderPreview } from "./components/OrderPreview";

const handleOrders = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/check-orders`);
  const data = await response.json();
  return data;
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: {
            include: {
              parts: true,
              ProductOperation: { include: { operation: true } },
            },
          },
        },
      },
    },
  });

  await handleOrders();

  const groupedOrdersByStatus = Object.groupBy(orders, ({ status }) => status);

  return (
    <div className="h-[calc(100vh-49px)] gap-2 flex justify-center items-center bg-slate-300">
      <section className="flex gap-4 p-4 h-full">
        {Object.entries(groupedOrdersByStatus).map(([key, value]) => (
          <div key={key} className="flex-col gap-2">
            <h2>{key}</h2>
            <ul className="flex-col">
              {value.map((order) => (
                <OrderPreview key={order.id} order={order} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

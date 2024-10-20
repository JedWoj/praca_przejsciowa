import { orders } from "@/app/api/orders";
import { products } from "@/app/api/products";
import { OrderProductsList } from "./components/OrderProductsList";
import { OrderStats } from "./components/OrderStats";
import { OrderPreviewBtns } from "../components/OrderPreviewBtns";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await orders.get(params.id);
  const fetchedProducts = await Promise.all(
    order.products.map((product) => products.get(product.id))
  );

  return (
    <div className="h-[calc(100vh-49px)] relative">
      <h1 className="text-4xl p-3">Order ID: {params.id}</h1>
      <section className="flex gap-4 p-4 h-5/6">
        <OrderProductsList order={order} products={fetchedProducts} />
        <OrderStats order={order} products={fetchedProducts} />
      </section>
      <div className="fixed bottom-5 right-1/2 translate-x-1/2">
        <OrderPreviewBtns orderId={params.id} />
      </div>
    </div>
  );
}

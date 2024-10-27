import { OrderPreviewBtns } from "../components/OrderPreviewBtns";
import { OrderProductsList } from "./components/OrderProductsList";
import { OrderStats } from "./components/OrderStats";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[calc(100vh-49px)] relative bg-blue-400">
      <h1 className="text-4xl p-3">Order ID: {params.id}</h1>
      <section className="flex gap-4 p-4 h-5/6">
        <OrderProductsList id={params.id} />
        <OrderStats id={params.id} />
      </section>
      <div className="fixed bottom-5 right-1/2 translate-x-1/2">
        <OrderPreviewBtns orderId={params.id} />
      </div>
    </div>
  );
}

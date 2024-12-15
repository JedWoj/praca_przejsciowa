import type { DynamicPageProps } from "@/app/utils/types";
import { OrderDecisionBtns } from "../components/OrderDecisionBtns";
import { OrderProductsList } from "./components/OrderProductsList";
import { OrderStats } from "./components/OrderStats";

export default async function OrderPage({
  params,
}: DynamicPageProps<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="h-[calc(100vh-49px)] relative text-white">
      <h1 className="text-5xl p-3 text-black font-bold">Order ID: {id}</h1>
      <section className="flex gap-4 p-4 h-5/6">
        <OrderProductsList id={id} />
        <OrderStats id={id} />
      </section>
      <div className="fixed bottom-5 right-1/2 translate-x-1/2">
        <OrderDecisionBtns orderId={id} />
      </div>
    </div>
  );
}

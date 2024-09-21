"use client";
import DeliveryItem from "@/app/_components/DeliveryItem";
import { useDeliveryContext } from "@/app/_context/DeliveryContext";

export default function Delivery({ params }: { params: { id: string } }) {
  const { deliveries } = useDeliveryContext();
  const handledDelivery = deliveries.find((it) => it.id === params.id);

  return (
    <div className="h-[calc(100vh-49px)] bg-gradient-to-tr from-lime-400 to-blue-600 flex flex-col px-40 pt-10 gap-5">
      <h1 className="text-3xl text-white text-center">
        {handledDelivery?.name}
      </h1>
      <h2 className="text-2xl text-white text-center">
        Items waiting to be dispatched: {handledDelivery?.items?.length}
      </h2>
      <section className="flex flex-col gap-2">
        {handledDelivery?.items?.map((it) => (
          <DeliveryItem key={it.id} item={it} />
        ))}
      </section>
    </div>
  );
}

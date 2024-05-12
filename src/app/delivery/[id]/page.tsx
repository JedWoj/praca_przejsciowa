"use client";
import { defaultDeliveries } from "@/app/utils/static";
import DeliveryItem from "@/app/_components/DeliveryItem";
import DisplayedModal from "@/app/_components/DisplayedModal";
import { useDeliveryContext } from "@/app/_context/DeliveryContext";

export default function Delivery({ params }: { params: { id: string } }) {
  const handledDelivery = defaultDeliveries.find((it) => it.id === params.id)!;
  const { deliveries } = useDeliveryContext();

  console.log(deliveries);

  return (
    <div className="h-screen bg-gradient-to-tr from-lime-400 to-blue-600 flex flex-col px-40 pt-10 gap-5">
      <h1 className="text-3xl text-white text-center">
        {handledDelivery?.name}
      </h1>
      <h2 className="text-2xl text-white text-center">
        Items waiting to be dispatched: {handledDelivery?.items.length}
      </h2>
      <section className="flex flex-col gap-2">
        {handledDelivery?.items.map((it) => (
          <DeliveryItem key={it.id} item={it} />
        ))}
      </section>
      <DisplayedModal />
    </div>
  );
}

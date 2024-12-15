"use client";
import Button from "@/app/components/UI/Button";

import { acceptOrder, rejectOrder } from "@/app/actions/handle-order";

type OrderPreviewBtnsProps = {
  orderId: string;
};

export function OrderDecisionBtns({ orderId }: OrderPreviewBtnsProps) {
  const handleAcceptOrder = async () => {
    try {
      await acceptOrder(orderId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectOrder = async () => {
    try {
      await rejectOrder(orderId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Button handleClick={handleAcceptOrder}>Accept</Button>
      <Button handleClick={handleRejectOrder} variant="secondary">
        Reject
      </Button>
    </div>
  );
}

"use client";
import Button from "@/app/components/UI/Button";

import { acceptOrder } from "@/app/actions/handle-order";

type OrderPreviewBtnsProps = {
  orderId: string;
};

export function OrderPreviewBtns({ orderId }: OrderPreviewBtnsProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button handleClick={() => acceptOrder(orderId)}>Accept</Button>
      <Button handleClick={() => {}} variant="secondary">
        Reject
      </Button>
    </div>
  );
}

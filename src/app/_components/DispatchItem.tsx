"use client";
import { useModalContext } from "../_context/ModalContext";
import Button from "./Button";
import { dispatchItemFromDelivery } from "../_actions/delivery-actions";

export default function DispatchItem() {
  const { hide } = useModalContext();

  return (
    <div className="flex gap-2">
      <section>
        <div className="flex flex-col gap-2">
          <label>Move to storage</label>
          <select className="text-purple-500">
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button handleClick={() => dispatchItemFromDelivery()}>
            Confirm
          </Button>
          <Button handleClick={hide}>Cancel</Button>
        </div>
      </section>
      {/* <section>
        <div>Storage Info</div>
        <div className="bg-white text-purple-500 rounded-md">
          <div>Nummber of items: 23</div>
          <div>Avaiable Space 37/60</div>
        </div>
      </section> */}
    </div>
  );
}

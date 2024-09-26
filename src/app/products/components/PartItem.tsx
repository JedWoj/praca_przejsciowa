import type { Dispatch, SetStateAction } from "react";
import type { MapppedPart } from "../utils/convertPartsToArray";

type PartItemProps = MapppedPart & {
  quantity: number;
  handleSelection: Dispatch<
    SetStateAction<Map<string, MapppedPart & { quantity: number }>>
  >;
};

export default function PartItem({
  name,
  price,
  id,
  quantity,
  handleSelection,
}: PartItemProps) {
  const incrementQuantity = () => {
    handleSelection((prev) => {
      prev.set(id, {
        id,
        name,
        price,
        quantity: quantity + 1,
      });
      return new Map(prev);
    });
  };

  const decrementQuantity = () => {
    handleSelection((prev) => {
      const newQuantity = quantity - 1;
      if (newQuantity === 0) {
        prev.delete(id);
      } else {
        prev.set(id, {
          id,
          name,
          price,
          quantity: newQuantity,
        });
      }
      return new Map(prev);
    });
  };

  return (
    <li className="p-2 flex items-center justify-between gap-4 bg-pink-300 min-w-96 rounded-md">
      <div className="flex flex-col">
        <span>Name: {name}</span>
        <span>Price: {price}$</span>
      </div>
      <div className="flex gap-1">
        {quantity ? <span>Quantity: {quantity}</span> : null}
        <button
          className="bg-slate-200 text-xl w-6 h-6 rounded-full flex items-center justify-center"
          type="button"
          onClick={incrementQuantity}
        >
          +
        </button>
        <button
          className="bg-slate-200 w-6 h-6 text-xl rounded-full flex items-center justify-center"
          type="button"
          disabled={!quantity}
          onClick={decrementQuantity}
        >
          -
        </button>
      </div>
    </li>
  );
}

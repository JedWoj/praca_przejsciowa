"use client";
import CustomList from "@/app/components/UI/CustomList/CustomList";
import { useCartContext } from "@/app/context/CartContext";

export default function OrderedProductsList() {
  const { items } = useCartContext();

  const listItems = Array.from(items.values());

  if (listItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <CustomList
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2 text-cyan-500"
      listItems={listItems}
      header={
        <div className="text-lg font-bold text-center mb-2">
          Products in cart!
        </div>
      }
    >
      {({ item }) => (
        <div className="p-2 bg-white gap-1 rounded-lg">
          <div>Name: {item.name}</div>
          <div>Quantity: {item.quantity}</div>
          <div>Single item price: {item.price}</div>
          <div>Total price: {item.price * item.quantity}</div>
        </div>
      )}
    </CustomList>
  );
}

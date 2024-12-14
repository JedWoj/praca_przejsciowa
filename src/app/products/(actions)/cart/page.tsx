import OrderBtn from "./components/OrderBtn";
import OrderedProductsList from "./components/OrderedProductsList";
import OrderCalendar from "./components/OrderCalendar";

export default function CartPage() {
  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center">
      <OrderedProductsList />
      <OrderCalendar />
      <OrderBtn />
    </div>
  );
}

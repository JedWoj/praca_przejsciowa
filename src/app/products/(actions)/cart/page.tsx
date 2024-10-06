import OrderBtn from "./components/OrderBtn";
import OrderedProductsList from "./components/OrderedProductsList";

export default function CartPage() {
  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center">
      <OrderedProductsList />
      <OrderBtn />
    </div>
  );
}

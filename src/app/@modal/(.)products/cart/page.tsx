import Dialog from "@/app/components/UI/Dialog";
import OrderBtn from "@/app/products/(actions)/cart/components/OrderBtn";
import OrderedProductsList from "@/app/products/(actions)/cart/components/OrderedProductsList";
import OrderCalendar from "@/app/products/(actions)/cart/components/OrderCalendar";

export default function CartPage() {
  return (
    <Dialog>
      <OrderedProductsList />
      <div className="flex justify-center w-full items-center gap-2">
        <OrderCalendar />
        <OrderBtn />
      </div>
    </Dialog>
  );
}

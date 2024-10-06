import Dialog from "@/app/components/UI/Dialog";
import OrderBtn from "@/app/products/(actions)/cart/components/OrderBtn";
import OrderedProductsList from "@/app/products/(actions)/cart/components/OrderedProductsList";

export default function CartPage() {
  return (
    <Dialog>
      <OrderedProductsList />
      <OrderBtn />
    </Dialog>
  );
}

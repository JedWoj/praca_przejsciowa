import { getOrder } from "./utils/getOrder";
import { calculateRequiredTimeToProduceProducts } from "@/app/utils/calculateRequiredTimeToProduceProducts";
import { prepareProductsFromOrder } from "@/app/utils/prepareProductsFromOrder";

type OrderStatsProps = {
  id: string;
};

export async function OrderStats({ id }: OrderStatsProps) {
  const order = await getOrder(id);
  const totalPrice = order?.products.reduce(
    (acc, it) => (acc += it.product.price * it.quantity),
    0
  );
  const totalProducts = order?.products.reduce(
    (acc, it) => (acc += it.quantity),
    0
  );

  const products = prepareProductsFromOrder(order!);

  const reqTime = calculateRequiredTimeToProduceProducts(products);

  const getFastestProductionCompletionDate = () => {
    const currentDate = new Date();
    const time = reqTime;
    currentDate.setMinutes(currentDate.getMinutes() + time + 60 + 2);
    return currentDate.toISOString();
  };

  return (
    <div className="flex-col flex gap-2 mt-4 grow">
      <div className="bg-green-400 p-2 rounded-md">
        <p>Order stats:</p>
        <p>Total price: {totalPrice}</p>
        <p>Total products: {totalProducts}</p>
        <p>Required time to produce: {reqTime} min</p>
        <p>
          Fastest production completion date:{" "}
          {getFastestProductionCompletionDate()}
        </p>
      </div>
    </div>
  );
}

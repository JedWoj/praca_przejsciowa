import { getOrder } from "./utils/getOrder";
import { calculateRequiredTimeToProduceProducts } from "@/app/utils/calculateRequiredTimeToProduceProducts";
import { prepareProductsFromOrder } from "@/app/utils/prepareProductsFromOrder";
import { format, addMinutes } from "date-fns";

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
    const fastestProductionCompletionDate = addMinutes(
      new Date(),
      reqTime + 60
    );
    return format(fastestProductionCompletionDate, "yyyy-MM-dd HH:mm");
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
        <p>
          Due date:{" "}
          {order?.dueDate
            ? format(order.dueDate, "yyyy-MM-dd HH:mm")
            : "Not set"}
        </p>
        <p>
          Planned components delivery:{" "}
          {format(
            addMinutes(order?.dueDate!, -reqTime - 60),
            "yyyy-MM-dd HH:mm"
          )}
        </p>
      </div>
    </div>
  );
}

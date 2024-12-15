import prisma from "@/lib/db";
import { calculateRequiredTimeToProduceProducts } from "../utils/calculateRequiredTimeToProduceProducts";
import { OrderPreview } from "./components/OrderPreview";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: {
            include: {
              parts: true,
              ProductOperation: { include: { operation: true } },
            },
          },
        },
      },
    },
  });

  const products = orders
    .flatMap((order) => order.products)
    .flatMap((product) => ({
      id: product.id,
      quantity: product.quantity,
      operations: product.product.ProductOperation.map((op) => ({
        time: op.operation.time,
        sequence: op.sequence,
      })),
    }));

  const ordersProducts = orders
    .flatMap((order) => order.products)
    .map((product) => ({
      id: product.id,
      quantity: product.quantity,
      operations: product.product.ProductOperation.map((op) => ({
        time: op.operation.time,
        sequence: op.sequence,
      })),
    }));

  ordersProducts.forEach((product) => {
    const requiredMaterials = calculateRequiredTimeToProduceProducts([product]);
    console.log(requiredMaterials);
  });

  const reqTime = calculateRequiredTimeToProduceProducts(products);

  console.log(reqTime);

  return (
    <div className="h-[calc(100vh-49px)] flex justify-center items-center">
      <ul className="flex-col">
        {orders.map((order) => (
          <OrderPreview key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

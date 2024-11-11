import ProductContainer from "./components/ProductContainer";
import prisma from "@/lib/db";

export default async function AddProductModal() {
  const [parts, operations] = await Promise.all([
    prisma.part.findMany(),
    prisma.operation.findMany(),
  ]);

  return <ProductContainer parts={parts} operations={operations} />;
}

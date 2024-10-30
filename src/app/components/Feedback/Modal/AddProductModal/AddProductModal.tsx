import ProductContainer from "./components/ProductContainer";
import prisma from "@/lib/db";

export default async function AddProductModal() {
  const parts = await prisma.part.findMany();

  return <ProductContainer parts={parts} />;
}

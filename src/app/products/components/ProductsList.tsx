import Card from "@/app/components/UI/Card";
import prisma from "@/lib/db";
import ProductBtns from "./ProductBtns";

export default async function ProductsList() {
  const products = await prisma.product.findMany();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {products.map((product) => (
        <li key={product.id}>
          <Card>
            <Card.Header>{product.name}</Card.Header>
            <Card.Footer>
              <ProductBtns product={product} />
            </Card.Footer>
          </Card>
        </li>
      ))}
    </ul>
  );
}

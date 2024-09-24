import Card from "@/app/components/UI/Card";
import { products } from "@/app/api/products";
import Link from "next/link";

export default async function ProductsList() {
  const productList = await products.get();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {Object.values(productList).map((product) => (
        <li key={product.id}>
          <Card>
            <Card.Header>{product.name}</Card.Header>
            <div className="p-2">
              {Object.values(product.parts).map((part) => (
                <p key={part.name}>{part.name}</p>
              ))}
            </div>
            <Card.Footer className="flex justify-end">
              <Link
                className="text-sm bg-white text-cyan-400 p-1 rounded-md"
                href={`/products/${product.id}`}
              >
                Go to product
              </Link>
            </Card.Footer>
          </Card>
        </li>
      ))}
    </ul>
  );
}

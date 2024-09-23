import { getDataFromDB } from "@/app/_actions/db-actions";
import Card from "@/app/_components/UI/Card";
import type { Products } from "../types";
import Link from "next/link";

const getProducts = async (): Promise<Products> => {
  const data = await getDataFromDB("/products");
  return data.exportVal();
};

export default async function ProductsList() {
  const products = await getProducts();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {Object.values(products).map((product) => (
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

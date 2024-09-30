import { products } from "@/app/api/products";
import Dialog from "@/app/components/UI/Dialog";
import { convertPartsToArray } from "@/app/products/utils/convertPartsToArray";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await products.get(params.id);

  const parts = convertPartsToArray(product.parts);

  return (
    <Dialog>
      <div>Name: {product.name}</div>
      <div>Price: {product.price}</div>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            {part.name} - {part.quantity}
          </li>
        ))}
      </ul>
    </Dialog>
  );
}

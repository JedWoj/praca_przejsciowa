import { products } from "@/app/api/products";
import Dialog from "@/app/components/UI/Dialog";
import { convertPartsToArray } from "@/app/products/utils/convertPartsToArray";
import prisma from "@/lib/db";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      parts: {
        select: {
          id: true,
          quantity: true,
          part: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <Dialog>
      <div>Name: {product?.name}</div>
      <div>Price: {product?.price}</div>
      <ul>
        {product?.parts.map((part) => (
          <li key={part.id}>
            {part.part.name} - {part.quantity}
          </li>
        ))}
      </ul>
    </Dialog>
  );
}

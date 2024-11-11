import Dialog from "@/app/components/UI/Dialog";
import prisma from "@/lib/db";
import type { DynamicPageProps } from "@/app/utils/types";

export default async function ProductPage({
  params,
}: DynamicPageProps<{ id: string }>) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
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
      ProductOperation: {
        include: {
          operation: true,
        },
      },
    },
  });

  return (
    <Dialog>
      <div className="p-4 bg-white rounded-lg text-black min-w-96">
        <p className="text-2xl">Name: {product?.name}</p>
        <p className="text-xl">Price: {product?.price}$</p>
        <p className="text-xl">
          Total production time:{" "}
          {product?.ProductOperation.reduce(
            (acc, it) => acc + it.operation.time,
            0
          )}{" "}
          min
        </p>
        <p className="text-xl mt-2">Parts: (name - quantity)</p>
        <ul>
          {product?.parts.map((part) => (
            <li key={part.id}>
              {part.part.name} - {part.quantity}
            </li>
          ))}
        </ul>
        <p className="text-xl mt-2">Operations: (sequence: name - time)</p>
        <ul>
          {product?.ProductOperation.map((operation) => (
            <li key={operation.id}>
              {operation.sequence}: {operation.operation.name} -{" "}
              {operation.operation.time} min
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}

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
  });

  return (
    <div className="h-[calc(100vh-49px)]">
      <section className="h-full">
        <div className="flex justify-center items-center flex-col gap-2 bg-cyan-500">
          <h1>{product?.name}</h1>
          <p>{product?.price}</p>
        </div>
      </section>
    </div>
  );
}

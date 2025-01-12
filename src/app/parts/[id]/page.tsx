import prisma from "@/lib/db";
import type { DynamicPageProps } from "@/app/utils/types";

export default async function PartPage({
  params,
}: DynamicPageProps<{ id: string }>) {
  const { id } = await params;

  const part = await prisma.part.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)] bg-slate-300 justify-center items-center">
      <h1 className="text-4xl p-3">Part Info</h1>
      <section className=" flex flex-col p-6 gap-2 bg-gradient-to-tl from-lime-400 to-blue-600 text-white rounded-md shadow-md">
        <div className="border-b-2 border-white pb-2">
          <label className="text-xl">Part ID:</label>
          <p>{part?.id}</p>
        </div>
        <div className="border-b-2 border-white pb-2">
          <label className="text-xl">Name:</label>
          <p>{part?.name}</p>
        </div>
        <div className="border-b-2 border-white pb-2">
          <label className="text-xl">Price:</label>
          <p>{part?.price} zł</p>
        </div>
        <div className="border-b-2 border-white pb-2">
          <label className="text-xl">Created At:</label>
          <p>{String(part?.createdAt)}</p>
        </div>
        <div className="border-b-2 border-white pb-2">
          <label className="text-xl">Updated At:</label>
          <p>{String(part?.updatedAt)}</p>
        </div>
      </section>
    </div>
  );
}

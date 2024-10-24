import prisma from "@/lib/db";

export default async function PartPage({ params }: { params: { id: string } }) {
  const part = await prisma.part.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)]">{part?.name}</div>
  );
}

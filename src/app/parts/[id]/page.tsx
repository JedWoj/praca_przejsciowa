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
    <div className="flex flex-col min-h-[calc(100vh-49px)]">{part?.name}</div>
  );
}

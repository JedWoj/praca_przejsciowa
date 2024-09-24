import { parts } from "@/app/api/parts";

export default async function PartPage({ params }: { params: { id: string } }) {
  const part = await parts.get(params.id);

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)]">{part.name}</div>
  );
}

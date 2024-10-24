import Card from "@/app/components/UI/Card";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PartsList() {
  const parts = await prisma.part.findMany();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {parts.map((part) => (
        <li key={part.id}>
          <Card>
            <Card.Header>{part.name}</Card.Header>
            <div className="p-2">
              <p>Price: {part.price}</p>
            </div>
            <Card.Footer className="flex justify-end">
              <Link
                className="text-sm bg-white text-cyan-400 p-1 rounded-md"
                href={`/parts/${part.id}`}
              >
                Go to part
              </Link>
            </Card.Footer>
          </Card>
        </li>
      ))}
    </ul>
  );
}

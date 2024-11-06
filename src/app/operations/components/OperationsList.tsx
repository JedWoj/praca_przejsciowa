import Card from "@/app/components/UI/Card";
import prisma from "@/lib/db";

export default async function OperationsList() {
  const operations = await prisma.operation.findMany();
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {operations.map((operation) => (
        <li key={operation.id}>
          <Card>
            <Card.Header>
              <p className="text-ellipsis overflow-hidden text-nowrap">
                ID: {operation.id}
              </p>
              <p>Name: {operation.name}</p>
              <p>Time: {operation.time} min</p>
            </Card.Header>
          </Card>
        </li>
      ))}
    </ul>
  );
}

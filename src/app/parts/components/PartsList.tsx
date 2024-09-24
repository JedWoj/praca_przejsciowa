import { getDataFromDB } from "@/app/actions/db-actions";
import type { Parts } from "@/app/api/parts/models/Parts";
import Card from "@/app/components/UI/Card";
import Link from "next/link";

const getParts = async (): Promise<Parts> => {
  const data = await getDataFromDB("/parts");
  return data.exportVal();
};

export default async function PartsList() {
  const parts = await getParts();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 w-full">
      {Object.entries(parts).map(([key, val]) => (
        <li key={key}>
          <Card>
            <Card.Header>{val.name}</Card.Header>
            <div className="p-2">
              <p>Price: {val.price}</p>
            </div>
            <Card.Footer className="flex justify-end">
              <Link
                className="text-sm bg-white text-cyan-400 p-1 rounded-md"
                href={`/parts/${key}`}
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

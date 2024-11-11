"use client";
import CustomList from "@/app/components/UI/CustomList/CustomList";
import { Prisma } from "@prisma/client";
import type { MapppedPart } from "../utils/convertPartsToArray";

type ProductOperationsListProps = {
  operations: Array<{
    operation: Prisma.OperationGetPayload<null>;
    parts: MapppedPart[];
  }>;
};

export default function ProductOperationsList({
  operations,
}: ProductOperationsListProps) {
  return (
    <section>
      <h2>Operations</h2>
      <ul>
        {Array.from(operations.values()).map((operation, idx) => (
          <li key={operation.operation.id + idx}>
            {idx + 1}: {operation.operation.name} - parts:{" "}
            {operation.parts.length}
          </li>
        ))}
      </ul>
    </section>
  );
}

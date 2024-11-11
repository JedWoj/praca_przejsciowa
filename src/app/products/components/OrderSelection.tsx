import CustomList from "@/app/components/UI/CustomList/CustomList";
import { Prisma } from "@prisma/client";
import OrderItem from "./OrderItem";
import { MouseEventHandler } from "react";

type OperationSelectionProps = {
  operations: Prisma.OperationGetPayload<null>[];
  handleSelection: (id: string) => void;
};

export default function OperationSelection({
  operations,
  handleSelection,
}: OperationSelectionProps) {
  const handleItemClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const target = e.target as HTMLElement;

    if (target.closest("li")?.id) {
      return handleSelection(target.closest("li")!.id);
    }
  };

  return (
    <CustomList
      className="p-4 rounded-md bg-slate-200 text-black gap-1 flex flex-col max-h-[40vh] overflow-auto"
      listItems={operations}
      header={<h2 className="text-xl">Operations selection</h2>}
      onClick={handleItemClick}
    >
      {({ item }) => <OrderItem order={item} key={item.id} />}
    </CustomList>
  );
}

import CustomList from "@/app/components/UI/CustomList/CustomList";
import { Prisma } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { type MapppedPart } from "../utils/convertPartsToArray";
import PartItem from "./PartItem";

type PartsSelectionProps = {
  parts: Prisma.PartGetPayload<null>[];
  selectionState: Map<string, MapppedPart & { quantity: number }>;
  handleSelection: Dispatch<
    SetStateAction<Map<string, MapppedPart & { quantity: number }>>
  >;
};

export default function PartsSelection({
  parts,
  selectionState,
  handleSelection,
}: PartsSelectionProps) {
  return (
    <CustomList
      header={<h2 className="text-xl">Parts selection</h2>}
      listItems={parts}
      className="p-4 rounded-md bg-slate-200 text-black gap-1 flex flex-col max-h-[40vh] overflow-auto"
    >
      {({ item }) => (
        <PartItem
          {...item}
          quantity={selectionState.get(item.id)?.quantity ?? 0}
          handleSelection={handleSelection}
          key={item.id}
        />
      )}
    </CustomList>
  );
}

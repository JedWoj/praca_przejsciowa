import type { Parts } from "@/app/api/parts/models/Parts";
import CustomList from "@/app/components/UI/CustomList/CustomList";
import type { Dispatch, SetStateAction } from "react";
import {
  convertPartsToArray,
  type MapppedPart,
} from "../utils/convertPartsToArray";
import PartItem from "./PartItem";

type PartsSelectionProps = {
  parts: Parts;
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
      listItems={convertPartsToArray(parts)}
      className="p-4 rounded-md bg-slate-200 text-black gap-1 flex flex-col max-h-40vh"
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

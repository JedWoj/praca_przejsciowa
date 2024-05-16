import Button from "./Button";
import {
  removeDataFromDB,
  removeMultipleRecordsFromDB,
} from "../_actions/db-actions";
import { useModalContext } from "../_context/ModalContext";
import { useTableContext } from "../_context/TableContext";

export default function RemoveItemModal() {
  const { hide } = useModalContext();
  const { table } = useTableContext();

  const selectedItems = table
    .getSelectedRowModel()
    .rows.map((item) => item.original);

  const handleRemoving = () => {
    const paths = selectedItems.map((it) => `/items/${it.id}`);

    selectedItems.length === 1
      ? removeDataFromDB(`/items/${selectedItems.at(0)?.id}`)
      : removeMultipleRecordsFromDB(paths);

    table.resetRowSelection();
    hide();
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-2xl">Do you want to remove this item?</h2>
      <div className="flex justify-around w-full">
        <Button handleClick={() => handleRemoving()}>
          <div className="p-1 text-xl">Confirm</div>
        </Button>
        <Button handleClick={hide}>
          <div className="p-1 text-xl">Cancel</div>
        </Button>
      </div>
    </div>
  );
}

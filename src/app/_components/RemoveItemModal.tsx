import Button from "./Button";
import { removeDataFromDB } from "../_actions/db-actions";
import { useModalContext } from "../_context/ModalContext";
import { useTableContext } from "../_context/TableContext";

export default function RemoveItemModal() {
  const { hide } = useModalContext();
  const { table } = useTableContext();

  const selectedItemId = table.getSelectedRowModel().rows.at(0)?.original.id;

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-2xl">Do you want to remove this item?</h2>
      <div className="flex justify-around w-full">
        <Button
          handleClick={() => removeDataFromDB(`/items/${selectedItemId}`)}
        >
          <div className="p-1 text-xl">Confirm</div>
        </Button>
        <Button handleClick={hide}>
          <div className="p-1 text-xl">Cancel</div>
        </Button>
      </div>
    </div>
  );
}

import { removeItemsFromStorage } from "@/app/actions/overview-actions";
import { useModalContext } from "@/app/context/ModalContext";
import { useTableContext } from "@/app/context/TableContext";
import useRefreshPageAfterAction from "@/app/hooks/useRefreshPageAfterAction";
import { useActionState } from "react";
import Button from "../../UI/Button";
import { SUCCESS_MESSAGES } from "@/app/actions/utils/messages";

export default function RemoveItemModal() {
  const { hide } = useModalContext();
  const { table, refetch } = useTableContext();
  const selectedItemsIds = table
    .getSelectedRowModel()
    .rows.map((it) => it.original.id);

  const [formState, FormAction] = useActionState(
    removeItemsFromStorage.bind(null, selectedItemsIds),
    ""
  );

  useRefreshPageAfterAction({
    state: formState,
    successMessage: SUCCESS_MESSAGES.removeItem,
    refetchFunction: refetch,
  });

  return (
    <div className="flex flex-col items-start gap-6">
      <form action={FormAction}>
        <h2 className="text-2xl">Do you want to remove this item?</h2>
        <div className="flex justify-around w-full">
          <Button buttonProps={{ type: "submit" }} handleClick={() => {}}>
            <div className="p-1 text-xl">Confirm</div>
          </Button>
          <Button handleClick={hide}>
            <div className="p-1 text-xl">Cancel</div>
          </Button>
        </div>
      </form>
    </div>
  );
}

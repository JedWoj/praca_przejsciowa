import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useModalContext } from "../context/ModalContext";

type UseRefreshPageAfterActionProps = {
  state: string;
  successMessage: string;
  refetchFunction?: () => void;
};

export default function useRefreshPageAfterAction({
  state,
  successMessage,
  refetchFunction,
}: UseRefreshPageAfterActionProps) {
  const router = useRouter();
  const { displayModal } = useModalContext();

  useEffect(() => {
    if (state === successMessage) {
      refetchFunction?.();
      router.refresh();
      displayModal(null);
    }
  }, [state, router, displayModal, successMessage, refetchFunction]);
}

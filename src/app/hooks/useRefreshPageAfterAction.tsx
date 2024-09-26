import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useModalContext } from "../context/ModalContext";

type UseRefreshPageAfterActionProps = {
  state: string;
  successMessage: string;
};

export default function useRefreshPageAfterAction({
  state,
  successMessage,
}: UseRefreshPageAfterActionProps) {
  const router = useRouter();
  const { displayModal } = useModalContext();

  useEffect(() => {
    if (state === successMessage) {
      router.refresh();
      displayModal(null);
    }
  }, [state, router, displayModal, successMessage]);
}

"use client";
import Button from "@/app/components/UI/Button";
import { useModalContext } from "@/app/context/ModalContext";

export default function AddPartBtn() {
  const { displayModal } = useModalContext();

  const handleClick = () => {
    displayModal("add_part");
  };

  return <Button handleClick={handleClick}>Add part</Button>;
}

"use client";
import Button from "@/app/_components/UI/Button";
import { useModalContext } from "@/app/_context/ModalContext";

export default function AddProductBtn() {
  const { displayModal } = useModalContext();

  const handleClick = () => {
    displayModal("add_product");
  };

  return <Button handleClick={handleClick}>Add Product</Button>;
}

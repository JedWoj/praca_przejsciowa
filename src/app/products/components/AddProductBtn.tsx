"use client";
import Button from "@/app/components/UI/Button";
import { useModalContext } from "@/app/context/ModalContext";

export default function AddProductBtn() {
  const { displayModal } = useModalContext();

  const handleClick = () => {
    displayModal("add_product");
  };

  return <Button handleClick={handleClick}>Add Product</Button>;
}

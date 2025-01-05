"use client";
import { useModalContext } from "../../context/ModalContext";
import Modal from "../UI/Modal";
import ChangeItemModal from "./Modal/ChangeItemModal";
import RemoveItemModal from "./Modal/RemoveItemModal";

export default function DisplayedModal() {
  const { modal } = useModalContext();

  const getModal = () => {
    let component;

    switch (modal) {
      case "change_item":
        component = <ChangeItemModal />;
        break;
      case "remove_item":
        component = <RemoveItemModal />;
        break;
      default:
        component = null;
        break;
    }

    return component;
  };

  return <Modal>{getModal()}</Modal>;
}

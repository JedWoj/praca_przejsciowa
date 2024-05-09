"use client";
import { useModalContext } from "../_context/ModalContext";
import Modal from "./Modal";
import ChangeItemValueModal from "./ChangeItemValueModal";
import RemoveItemModal from "./RemoveItemModal";
import AddItemModal from "./AddItemModal";
import OrderItemModal from "./OrderItemModal";

export default function DisplayedModal() {
  const { modal } = useModalContext();

  if (!modal) {
    return modal;
  }

  const getModal = () => {
    let component;

    switch (modal) {
      case "change_value":
        component = <ChangeItemValueModal />;
        break;
      case "add_item":
        component = <AddItemModal />;
        break;
      case "remove_item":
        component = <RemoveItemModal />;
        break;
      case "order_item":
        component = <OrderItemModal />;
        break;
      default:
        component = null;
        break;
    }

    return component;
  };

  return <Modal>{getModal()}</Modal>;
}

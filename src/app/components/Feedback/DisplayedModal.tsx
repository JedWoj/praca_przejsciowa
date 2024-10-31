"use client";
import { useModalContext } from "../../context/ModalContext";
import Modal from "../UI/Modal";
import AddItemModal from "./Modal/AddItemModal";
import ChangeItemValueModal from "./Modal/ChangeItemValueModal";
import OrderItemModal from "./Modal/OrderItemModal";
import RemoveItemModal from "./Modal/RemoveItemModal";

export default function DisplayedModal() {
  const { modal } = useModalContext();

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

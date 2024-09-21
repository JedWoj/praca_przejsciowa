"use client";
import { useModalContext } from "../../_context/ModalContext";
import OrderItemModal from "./Modal/OrderItemModal";
import Modal from "../UI/Modal";
import AddItemModal from "./Modal/AddItemModal";
import AddProductModal from "./Modal/AddProductModal";
import ChangeItemValueModal from "./Modal/ChangeItemValueModal";
import MakeOrderModal from "./Modal/MakeOrderModal";
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
      case "make_order":
        component = <MakeOrderModal />;
        break;
      case "add_product":
        component = <AddProductModal />;
        break;
      default:
        component = null;
        break;
    }

    return component;
  };

  return <Modal>{getModal()}</Modal>;
}

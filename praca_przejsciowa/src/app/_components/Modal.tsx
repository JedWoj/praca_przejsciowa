"use client";
import { PropsWithChildren } from "react";
import { useModalContext } from "../_context/ModalContext";

export default function Modal({ children }: PropsWithChildren) {
  const { isVisible, toggle } = useModalContext();

  return (
    <>
      {isVisible ? (
        <section className="p-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md">
          <div
            onClick={toggle}
            className="absolute right-2 top-2 cursor-pointer hover:bg-indigo-500 w-8 h-8 rounded-full flex justify-center items-center text-center select-none"
          >
            X
          </div>
          {children}
        </section>
      ) : null}
    </>
  );
}

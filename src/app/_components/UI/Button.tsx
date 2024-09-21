"use client";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

type ButtonProps = PropsWithChildren<{
  handleClick: () => void;
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}>;

export default function Button({
  buttonProps,
  handleClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={` rounded-md text-white p-2 ${
        buttonProps?.disabled
          ? "bg-slate-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-green-600"
      }`}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

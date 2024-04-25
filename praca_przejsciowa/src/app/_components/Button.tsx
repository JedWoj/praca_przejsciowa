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
      className="bg-gradient-to-r from-blue-500 to-green-600 rounded-md"
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

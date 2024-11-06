"use client";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEvent,
  PropsWithChildren,
} from "react";

type ButtonProps = PropsWithChildren<{
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  className?: string;
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}>;

export default function Button({
  buttonProps,
  handleClick,
  className,
  variant = "primary",
  children,
}: ButtonProps) {
  const gradient =
    variant === "primary"
      ? "from-blue-500 to-green-600"
      : "from-red-500 to-yellow-600";

  return (
    <button
      className={` rounded-md text-white p-2 ${
        buttonProps?.disabled
          ? "bg-slate-500 cursor-not-allowed"
          : `bg-gradient-to-r ${gradient}`
      } ${className}`}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

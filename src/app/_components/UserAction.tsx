"use client";
import { PropsWithChildren } from "react";

export function UserAction({ children }: PropsWithChildren) {
  return (
    <button className="text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer">
      {children}
    </button>
  );
}

"use client";
import type { PropsWithChildren } from "react";

export function UserAction({ children }: PropsWithChildren) {
  return (
    <button className="text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer rounded-lg text-2xl">
      {children}
    </button>
  );
}

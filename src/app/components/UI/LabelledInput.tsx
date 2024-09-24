"use client";

import { HTMLProps } from "react";

type LabelledInputProps<TVal extends string | number> = {
  label: string;
  value: TVal;
  uniqueName: string;
  buttonProps?: HTMLProps<HTMLInputElement>;
  onChange: (value: string, name: string) => void;
};

export default function LabelledInput<TVal extends string | number>({
  label,
  value,
  uniqueName,
  buttonProps,
  onChange,
}: LabelledInputProps<TVal>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={uniqueName}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value, uniqueName)}
        className="border-2 border-cyan-400 rounded-lg p-1 text-black"
        id={uniqueName}
        {...buttonProps}
      />
    </div>
  );
}

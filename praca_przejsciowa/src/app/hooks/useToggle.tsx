"use client";
import { Dispatch, SetStateAction, useState } from "react";

export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [isToggled, setIsToggled] = useState<boolean>(initialValue);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  return [isToggled, toggle, setIsToggled];
}

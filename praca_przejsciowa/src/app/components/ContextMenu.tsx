import type { MenuContextType } from "../context/MenuContext";
import { useClickOutside } from "../hooks/useClickOutside";

export function ContextMenu({ cords, isVisible, reset }: MenuContextType) {
  const { ref } = useClickOutside<HTMLUListElement>({
    onOutside: reset,
  });

  return (
    <ul
      ref={ref}
      style={{
        top: cords.y ?? 0,
        left: cords.x ?? 0,
        display: isVisible ? "block" : "none",
      }}
      className="absolute bg-violet-950 text-white p-5 text-lg"
    >
      <li>123231</li>
      <li>123231</li>
      <li>123231</li>
      <li>123231</li>
      <li>123231</li>
    </ul>
  );
}

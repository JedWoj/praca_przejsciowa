"use client";
import { useRouter } from "next/navigation";

export default function CloseBtn() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <button onClick={handleClose} className="absolute top-1 right-1">
      X
    </button>
  );
}

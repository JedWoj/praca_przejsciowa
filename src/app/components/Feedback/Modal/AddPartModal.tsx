"use client";
import Button from "../../UI/Button";
import { useRouter } from "next/navigation";

export default function AddPartModal() {
  const router = useRouter();
  const handleClick = () => {
    router.refresh();
  };

  return (
    <div>
      <Button handleClick={handleClick}>Add Part</Button>
    </div>
  );
}

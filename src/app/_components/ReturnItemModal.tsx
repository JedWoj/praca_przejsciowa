import Button from "./Button";

export default function ReturnItemModal() {
  return (
    <div>
      <p>Return Item</p>
      <h2>Do you really want to return this item?</h2>
      <div className="flex gap-2">
        <Button handleClick={() => console.log("returned")}>Confirm</Button>
      </div>
    </div>
  );
}

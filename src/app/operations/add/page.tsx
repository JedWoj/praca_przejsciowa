import AddOperationModal from "@/app/components/Feedback/Modal/AddOperationModal";

export default function AddOperationPage() {
  return (
    <div className="h-[calc(100vh-49px)]">
      <section className="flex flex-grow flex-col">
        <AddOperationModal />
      </section>
    </div>
  );
}

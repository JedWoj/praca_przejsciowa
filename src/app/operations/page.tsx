import LinkButton from "../components/UI/LinkButton";
import OperationsList from "./components/OperationsList";

export default async function OperationsPage() {
  return (
    <div className="h-[calc(100vh-49px)] bg-slate-300">
      <section className="flex justify-between items-center p-6">
        <h1 className="text-2xl">operations</h1>
        <LinkButton href="/operations/add">Add operation</LinkButton>
      </section>
      <section className="flex justify-center">
        <OperationsList />
      </section>
    </div>
  );
}

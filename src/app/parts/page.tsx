import { Suspense } from "react";
import LinkButton from "../components/UI/LinkButton";
import Spinner from "../components/UI/Spinner/Spinner";
import PartsList from "./components/PartsList";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  return (
    <div className="min-h-[calc(100vh-49px)] bg-slate-300">
      <section className="flex justify-between items-center p-6">
        <h1 className="text-2xl">Parts</h1>
        <LinkButton href="/parts/add">Add Part</LinkButton>
      </section>
      <section className="flex justify-center">
        <Suspense fallback={<Spinner />}>
          <PartsList />
        </Suspense>
      </section>
    </div>
  );
}

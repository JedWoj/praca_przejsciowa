import { Suspense } from "react";
import AddPartBtn from "./components/AddPartBtn";
import PartsList from "./components/PartsList";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  return (
    <div className="min-h-[calc(100vh-49px)]">
      <section className="flex justify-between items-center p-6">
        <h1 className="text-2xl">Parts</h1>
        <AddPartBtn />
      </section>
      <section className="flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <PartsList />
        </Suspense>
      </section>
    </div>
  );
}

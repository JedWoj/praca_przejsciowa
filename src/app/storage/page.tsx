import StorageOverview from "./components/StorageOverview";
import TotalStorageOverview from "./components/TotalStorageOverview";
import { defaultStorages } from "../utils/static";

export default function StoragePage() {
  return (
    <main className=" flex justify-center items-center min-h-[calc(100vh-49px)] flex-col">
      <section className="flex justify-center items-center gap-10 flex-wrap p-10">
        <TotalStorageOverview />
        {defaultStorages.map((storage) => (
          <StorageOverview storage={storage} key={storage.name} />
        ))}
      </section>
    </main>
  );
}

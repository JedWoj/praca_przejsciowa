"use client";
import type { Storage } from "@/app/utils/types";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { useTableContext } from "@/app/_context/TableContext";

type StorageOverviewProps = {
  storage: Storage;
};

Chart.register(ArcElement, Tooltip);

export default function StorageOverview({ storage }: StorageOverviewProps) {
  const { data } = useTableContext();

  const itemsInStorage = data.filter((it) => it.location === storage.name);
  const totalTakenSpace = itemsInStorage.reduce(
    (acc, it) => acc + it.currentStock,
    0
  );

  return (
    <section className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg">
      <h1 className="text-center text-2xl">
        Storage name: {storage.name} | Capacity: {storage.capacity}
      </h1>
      <div className="flex gap-4">
        <div>
          <Doughnut
            data={{
              labels: [...itemsInStorage.map((it) => it.name), "Empty space"],
              datasets: [
                {
                  data: [
                    ...itemsInStorage.map((it) => it.currentStock),
                    storage.capacity - totalTakenSpace,
                  ],
                  backgroundColor: [
                    ...Array(itemsInStorage.length).fill(
                      "rgba(247, 31, 77, 0.2)"
                    ),
                    "rgba(54, 235, 66, 0.2)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div className=" bg-gradient-to-r from-green-600 to-blue-500 p-2 rounded-lg text-white">
          <p className="text-xl">Items in storage: {totalTakenSpace}</p>
          <ul className="max-h-72 overflow-auto">
            {itemsInStorage.map((it) => (
              <li key={it.id}>
                {it.name} - {it.currentStock}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

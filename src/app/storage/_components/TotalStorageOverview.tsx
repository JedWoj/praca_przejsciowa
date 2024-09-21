"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { defaultStorages } from "@/app/utils/static";
import { useTableContext } from "@/app/_context/TableContext";

Chart.register(ArcElement, Tooltip);

export default function TotalStorageOverview() {
  const { data } = useTableContext();

  const totalCapacity = defaultStorages.reduce(
    (acc, it) => acc + it.capacity,
    0
  );
  const totalTakenSpace = data.reduce((acc, it) => acc + it.currentStock, 0);

  return (
    <section className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg">
      <h1 className="text-center text-2xl">
        Combined storages capacity: {totalCapacity}
      </h1>
      <div className="flex gap-4 justify-center">
        <div>
          <Doughnut
            data={{
              labels: ["Taken Space", "Empty space"],
              datasets: [
                {
                  data: [totalCapacity, totalTakenSpace],
                  backgroundColor: [
                    "rgba(247, 31, 77, 0.2)",
                    "rgba(29, 199, 40, 0.2)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
}

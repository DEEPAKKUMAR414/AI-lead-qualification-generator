"use client";

import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  chartData: any;
};

export default function AnalyticsChart({ chartData }: Props) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Lead Analytics
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            Distribution of leads by current status
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          Live
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            animation: {
              duration: 1200,
            },

            plugins: {
              legend: {
                display: false,
              },

              tooltip: {
                backgroundColor: isDark ? "#18181b" : "#ffffff",
                titleColor: isDark ? "#ffffff" : "#111827",
                bodyColor: isDark ? "#d4d4d8" : "#374151",
                borderColor: isDark ? "#3f3f46" : "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
              },
            },

            scales: {
              x: {
                grid: {
                  display: false,
                },

                ticks: {
                  color: isDark ? "#a1a1aa" : "#6b7280",
                  font: {
                    size: 12,
                    weight: 500,
                  },
                },
              },

              y: {
                beginAtZero: true,

                ticks: {
                  precision: 0,
                  color: isDark ? "#a1a1aa" : "#6b7280",
                },

                grid: {
                  color: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
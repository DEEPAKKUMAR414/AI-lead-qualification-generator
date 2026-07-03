"use client";

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

export default function AnalyticsChart({
  chartData,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Lead Analytics
      </h2>

      <Bar data={chartData} />
    </div>
  );
}
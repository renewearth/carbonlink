import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useChartTheme } from "../common/hooks";
import { formatLabel } from "../common/utils";
import { CarbonlinkBarChartProps } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const CarbonlinkBarChart: React.FC<CarbonlinkBarChartProps> = ({
  labels,
  datasets,
  stacked = false,
  onLegendClick,
}) => {
  const chartTheme = useChartTheme();
  const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      stack: stacked ? "stack" : undefined,
      hidden: hiddenDatasets.includes(index),
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: chartTheme.backgroundColor,
        titleColor: chartTheme.textColor,
        bodyColor: chartTheme.secondaryTextColor,
        padding: 8,
        callbacks: {
          label(context) {
            const label = context.dataset.label || "";
            const value = context.raw as number | null;
            return formatLabel(label, value);
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: chartTheme.textColor,
          font: {
            size: chartTheme.fontSize,
            family: chartTheme.fontFamily,
          },
        },
        onClick(evt, item, legend) {
          const index = item.datasetIndex;
          if (typeof index === "number") {
            setHiddenDatasets((prev) => {
              if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
              } else {
                return [...prev, index];
              }
            });
            onLegendClick?.(index);
          }
        },
      },
    },
    scales: {
      x: {
        stacked,
        grid: {
          display: false,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            size: chartTheme.fontSize,
            family: chartTheme.fontFamily,
          },
        },
      },
      y: {
        stacked,
        grid: {
          display: true,
          color: chartTheme.gridColor,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            size: chartTheme.fontSize,
            family: chartTheme.fontFamily,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

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
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useChartTheme } from "../common/hooks";
import { CarbonlinkBarChartProps } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

export const CarbonlinkBarChart: React.FC<CarbonlinkBarChartProps> = ({
  labels,
  datasets,
  stacked = false,
  onLegendClick,
  height = 400,
  width = "100%",
  formatTooltipValue = (value) => value.toLocaleString(),
  yAxisTickFormatter = (value) => value.toLocaleString(),
}) => {
  const chartTheme = useChartTheme();
  const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      stack: stacked ? "stack1" : undefined,
      hidden: hiddenDatasets.includes(index),
      borderRadius: dataset.borderRadius ?? 4,
      borderColor: dataset.borderColor ?? dataset.backgroundColor,
      borderWidth: dataset.borderWidth ?? 0,
      hoverBackgroundColor:
        dataset.hoverBackgroundColor ?? dataset.backgroundColor,
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
            const value = context.raw as number;
            const formattedValue = formatTooltipValue(value);
            return `${label}: ${formattedValue}`;
          },
          footer(tooltipItems) {
            if (stacked) {
              const total = tooltipItems.reduce(
                (sum, item) => sum + (item.raw as number),
                0,
              );
              return `Total: ${formatTooltipValue(total)}`;
            }
            return "";
          },
        },
      },
      legend: {
        display: true,
        position: "top" as const,
        align: "center" as const,
        labels: {
          color: chartTheme.textColor,
          font: {
            size: chartTheme.fontSize,
            family: chartTheme.fontFamily,
          },
          usePointStyle: true,
        },
        onClick(evt, item, legend) {
          const index = item.datasetIndex;
          if (typeof index === "number") {
            setHiddenDatasets((prev) => {
              const newHidden = prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index];
              onLegendClick?.(index);
              return newHidden;
            });
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
          callback: function (value) {
            if (typeof value === "number") {
              return yAxisTickFormatter(value);
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CarbonlinkBarChart;

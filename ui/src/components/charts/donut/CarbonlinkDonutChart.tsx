import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useChartTheme } from "../common/hooks";
import { CarbonlinkDonutChartProps } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CarbonlinkDonutChart: React.FC<CarbonlinkDonutChartProps> = ({
  data,
  centerText,
  showLegend = true,
  showLabels = true,
  onSliceClick,
  innerRadius = 60,
  outerRadius = 80,
}) => {
  const chartTheme = useChartTheme();

  const chartData: ChartData<"doughnut"> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map(
          (item) => item.color || chartTheme.backgroundColor,
        ),
        borderColor: Array(data.length).fill(chartTheme.gridColor),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: `${innerRadius}%`,
    radius: `${outerRadius}%`,
    plugins: {
      legend: {
        display: showLegend,
        position: "right",
        labels: {
          color: chartTheme.textColor,
          font: {
            size: chartTheme.fontSize,
            family: chartTheme.fontFamily,
          },
        },
      },
      tooltip: {
        backgroundColor: chartTheme.backgroundColor,
        titleColor: chartTheme.textColor,
        bodyColor: chartTheme.secondaryTextColor,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.label}: ${value.toLocaleString("ko-KR")}`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onSliceClick) {
        const index = elements[0].index;
        onSliceClick(data[index]);
      }
    },
  };

  if (centerText) {
    return (
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        <Doughnut data={chartData} options={options} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: chartTheme.textColor,
            fontSize: chartTheme.fontSize,
            fontFamily: chartTheme.fontFamily,
          }}
        >
          {centerText}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CarbonlinkDonutChart;

"use client";

import React, { useState, useCallback } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import { Box, styled } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DonutDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface CarbonlinkDonutChartProps {
  data: DonutDataItem[];
  centerText?: string;
  showLegend?: boolean;
  customOptions?: Partial<ChartOptions<"doughnut">>;
  onSliceClick?: (item: DonutDataItem) => void;
  width?: number | string;
  height?: number;
}

interface HiddenSections {
  [key: string]: boolean;
}

// 기본 차트 색상
const DEFAULT_COLORS = [
  "#8D85E6", // Primary
  "#7A71D9", // Primary Dark
  "#AFA8EC", // Primary Light
  "#82CA9D", // Secondary
  "#69B585", // Secondary Dark
  "#A1D7B5", // Secondary Light
  "#FFB74D", // Warning
  "#FF9800", // Orange
];

const LegendContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
  marginTop: "20px",
});

const LegendItem = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "14px",
});

const LegendColor = styled(Box)({
  width: "12px",
  height: "12px",
  marginRight: "8px",
  borderRadius: "2px",
});

export const CarbonlinkDonutChart: React.FC<CarbonlinkDonutChartProps> = ({
  data = [],
  centerText,
  showLegend = true,
  customOptions,
  onSliceClick,
  width = "100%",
  height = 400,
}) => {
  const theme = useTheme();
  const [hiddenSections, setHiddenSections] = useState<HiddenSections>({});

  // 색상 매핑 함수
  const getChartColor = (name: string, index: number): string => {
    // 커스텀 색상이 있는 경우 사용
    const item = data[index];
    if (item?.color) return item.color;

    // 테마에 정의된 색상 매핑
    if (theme.palette.customDonut && name in theme.palette.customDonut) {
      return theme.palette.customDonut[
        name as keyof typeof theme.palette.customDonut
      ];
    }
    if (name === "scope1" && theme.palette.customBar?.scope1) {
      return theme.palette.customBar.scope1;
    }
    if (name === "scope2" && theme.palette.customBar?.scope2) {
      return theme.palette.customBar.scope2;
    }

    // 기본 색상
    return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
  };

  const visibleData = data.filter((item) => !hiddenSections[item.name]);
  const totalValue = visibleData.reduce((acc, entry) => acc + entry.value, 0);

  const handleLegendClick = useCallback((name: string) => {
    setHiddenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const handleClick = (event: any, elements: any[]) => {
    if (elements.length > 0 && onSliceClick) {
      const index = elements[0].index;
      onSliceClick(visibleData[index]);
    }
  };

  const chartData: ChartData<"doughnut"> = {
    labels: visibleData.map((item) => item.name),
    datasets: [
      {
        data: visibleData.map((item) => item.value),
        backgroundColor: visibleData.map((item, index) =>
          getChartColor(item.name, index),
        ),
        borderColor: Array(visibleData.length).fill(
          theme.palette.background.paper,
        ),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    radius: "90%",
    onClick: handleClick,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: TooltipItem<"doughnut">) => {
            const value = context.raw as number;
            const percentage = ((value / totalValue) * 100).toFixed(2);
            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      ...customOptions?.plugins,
    },
    ...customOptions,
  };

  const CustomLegend = () => (
    <LegendContainer>
      {data.map((entry, index) => (
        <LegendItem
          key={entry.name}
          onClick={() => handleLegendClick(entry.name)}
          sx={{
            opacity: hiddenSections[entry.name] ? 0.5 : 1,
          }}
        >
          <LegendColor
            sx={{
              backgroundColor: getChartColor(entry.name, index),
            }}
          />
          <span>{entry.name}</span>
        </LegendItem>
      ))}
    </LegendContainer>
  );

  return (
    <Box sx={{ width, height }}>
      <Box
        sx={{
          position: "relative",
          height: showLegend ? "calc(100% - 60px)" : "100%",
        }}
      >
        <Doughnut
          data={chartData}
          options={options}
          plugins={[
            {
              id: "centerText",
              afterDraw: (chart) => {
                if (!centerText) return;

                const ctx = chart.ctx;
                const centerX = chart.getDatasetMeta(0).data[0]?.x ?? 0;
                const centerY = chart.getDatasetMeta(0).data[0]?.y ?? 0;

                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `${theme.typography.body2.fontSize}px ${theme.typography.fontFamily}`;
                ctx.fillStyle = theme.palette.text.primary;
                ctx.fillText(centerText, centerX, centerY);
                ctx.restore();
              },
            },
          ]}
        />
      </Box>
      {showLegend && <CustomLegend />}
    </Box>
  );
};

export default CarbonlinkDonutChart;

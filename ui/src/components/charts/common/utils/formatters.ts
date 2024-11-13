export const formatNumber = (value: number | null): string => {
  if (value === null) return "-";
  return new Intl.NumberFormat("ko-KR").format(value);
};

export const formatLabel = (label: string, value: number | null): string => {
  if (value === null) return `${label}: -`;
  return `${label}: ${formatNumber(value)}`;
};

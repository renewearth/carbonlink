import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import { ReactNode } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  borderBottom: `2px solid ${theme.palette.divider}`,
  whiteSpace: "nowrap",
}));

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  unit?: string;
  formatter?: (value: T[keyof T], row: T) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string | number;
}

export interface CarbonlinkTableProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnConfig<T>[];
  getRowKey?: (row: T) => string | number;
  formatNumber?: (value: number | undefined) => string;
  stickyHeader?: boolean;
  size?: "small" | "medium";
  maxHeight?: number | string;
}

export default function CarbonlinkTable<T extends Record<string, any>>({
  data,
  columns,
  getRowKey = (row: T) => JSON.stringify(row),
  formatNumber = (value) => {
    if (value === undefined || value === null) return "-";
    return new Intl.NumberFormat("ko-KR").format(Number(value.toFixed(2)));
  },
  stickyHeader = false,
  size = "small",
  maxHeight,
}: CarbonlinkTableProps<T>) {
  const renderCellContent = (row: T, column: ColumnConfig<T>): ReactNode => {
    const value = row[column.key];
    if (column.formatter) {
      return column.formatter(value, row); // 두 번째 인자로 row 전달
    }
    if (typeof value === "number") {
      return formatNumber(value);
    }
    return value as ReactNode;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight,
        "& .MuiTableCell-root": {
          padding: size === "small" ? "6px 16px" : "16px",
        },
      }}
    >
      <Table stickyHeader={stickyHeader} size={size}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
            {columns.map((column) => (
              <StyledTableCell
                key={String(column.key)}
                align={column.align || "left"}
                sx={{ width: column.width }}
              >
                {column.unit
                  ? `${column.label} (${column.unit})`
                  : column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={getRowKey(row)}
              sx={{
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  align={column.align || "left"}
                >
                  {renderCellContent(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

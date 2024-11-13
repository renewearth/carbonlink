import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
} from "@mui/material";
import { CarbonlinkTableProps } from "./types";

export const CarbonlinkTable = <T extends { [key: string]: any }>({
  data,
  columns,
  rowKey,
  transpose = false,
  onRowClick,
}: CarbonlinkTableProps<T>) => {
  const theme = useTheme();

  const renderRegularTable = () => (
    <Table size="small">
      <TableHead>
        <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
          {columns.map((col) => (
            <TableCell
              key={String(col.key)}
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                padding: "12px 16px",
              }}
            >
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={String(item[rowKey])}
            hover
            sx={{
              cursor: onRowClick ? "pointer" : "default",
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map((col) => (
              <TableCell
                key={`${String(item[rowKey])}-${String(col.key)}`}
                sx={{
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                }}
              >
                {col.format ? col.format(item[col.key]) : item[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderTransposedTable = () => {
    const keys = [...new Set(data.map((item) => String(item[rowKey])))];

    return (
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                padding: "12px 16px",
                whiteSpace: "nowrap",
              }}
            >
              {columns[0].label}
            </TableCell>
            {keys.map((key) => (
              <TableCell
                key={key}
                align="right"
                sx={{
                  fontWeight: "bold",
                  padding: "12px 16px",
                  whiteSpace: "nowrap",
                }}
              >
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.slice(1).map((col) => (
            <TableRow
              key={String(col.key)}
              hover
              sx={{
                cursor: onRowClick ? "pointer" : "default",
                "&:nth-of-type(odd)": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              onClick={() => {
                const rowData = data.map((item) => ({
                  key: item[rowKey],
                  value: item[col.key],
                }));
                onRowClick?.(rowData as any);
              }}
            >
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                }}
              >
                {col.label}
              </TableCell>
              {keys.map((key) => {
                const rowData = data.find(
                  (item) => String(item[rowKey]) === key,
                );
                return (
                  <TableCell
                    key={`${String(col.key)}-${key}`}
                    align="right"
                    sx={{
                      whiteSpace: "nowrap",
                      padding: "8px 16px",
                    }}
                  >
                    {rowData
                      ? col.format
                        ? col.format(rowData[col.key])
                        : rowData[col.key]
                      : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        boxShadow: theme.shadows[1],
        borderRadius: 1,
        overflow: "auto",
        "&::-webkit-scrollbar": {
          height: 10,
          width: 10,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.grey[100],
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[400],
          borderRadius: 5,
        },
      }}
    >
      {transpose ? renderTransposedTable() : renderRegularTable()}
    </TableContainer>
  );
};

export default CarbonlinkTable;

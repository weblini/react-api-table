import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Order, OrderProperty, headCells } from "../utils";
import { visuallyHidden } from "@mui/utils";
import { memo } from "react";

type Props = {
  order: Order;
  orderBy: OrderProperty;
  handleSort: (property: OrderProperty) => void;
};

const TableHeaders = memo(({ order, orderBy, handleSort }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.field}
            sortDirection={orderBy === headCell.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : "asc"}
              onClick={() => handleSort(headCell.field)}
              sx={{
                borderRadius: "2px",
                "&:focus": {
                  boxShadow: (theme) =>
                    `0 0 0 1px ${theme.palette.primary.light}`,
                },
              }}
            >
              {headCell.headerName}
              {orderBy === headCell.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

export default TableHeaders;

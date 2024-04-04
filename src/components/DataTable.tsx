import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useSWR, { preload } from "swr";
import PageCountSelector from "./PageCountSelector";
import {
  type Order,
  type OrderProperty,
  defaults,
  fetcher,
  getApiURL,
} from "../utils";
import TableContent from "./TableContent";
import TableHeaders from "./TableHeaders";

export default function DataTable() {
  const [page, setPage] = useState(defaults.page);
  const [rowsPerPage, setRowsPerPage] = useState(defaults.rows);
  const [order, setOrder] = useState<Order>(defaults.order);
  const [orderBy, setOrderBy] = useState<OrderProperty>(defaults.orderProperty);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const resetState = () => {
    setPage(defaults.page);
    setRowsPerPage(defaults.rows);
    setOrder(defaults.order);
    setOrderBy(defaults.orderProperty);
  };

  const handleChangeRows = useCallback(
    (_: unknown, newRows: number | null) => {
      setRowsPerPage(newRows || 5);
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const handleRequestSort = (property: OrderProperty) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const url = getApiURL(page, rowsPerPage, order, orderBy)

  const { data, error, isLoading } = useSWR(
    url,
    fetcher,
    {
      dedupingInterval: 5000,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount: false
    }
  );

  // // preload next page
  // useEffect(() => {
  //   if (data?.items?.length) {
  //     preload(getApiURL(page + 1, rowsPerPage, order, orderBy), fetcher);
  //   }
  // }, [page, rowsPerPage, order, orderBy]);

  return (
    <>
      <PageCountSelector rows={rowsPerPage} handleChangeRows={handleChangeRows}>
        {isLoading && <CircularProgress />}
      </PageCountSelector>

      <TableContainer sx={{ position: "relative" }}>
        <Table stickyHeader aria-labelledby="Tag data" size="medium">
          <TableHeaders
            order={order}
            orderBy={orderBy}
            handleSort={handleRequestSort}
          />
          <TableBody sx={{ opacity: isLoading ? 0.5 : 1 }}>
            <TableContent error={error} data={data} resetState={resetState} />
          </TableBody>
        </Table>
      </TableContainer>
      {!error && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          showFirstButton={true}
          sx={{ marginTop: "auto" }}
        />
      )}
    </>
  );
}

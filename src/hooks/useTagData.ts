import { useState, useCallback, useEffect } from "react";
import useSWR, { preload } from "swr";
import { defaults, Order, OrderProperty, getApiURL, fetcher } from "../utils";

export default function useTagData() {
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

  const handleRequestSort = useCallback(
    (property: OrderProperty) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      setPage(1);
    },
    [setOrder, setOrderBy, setPage, order, orderBy]
  );

  const { data, error, isLoading } = useSWR(
    getApiURL(page, rowsPerPage, order, orderBy),
    fetcher
  );

  // preload next page
  useEffect(() => {
    if (data?.items?.length) {
      preload(getApiURL(page + 1, rowsPerPage, order, orderBy), fetcher);
    }
  }, [page, rowsPerPage, order, orderBy]);

  return ({page, rowsPerPage, order, orderBy, handleChangePage, handleChangeRows, handleRequestSort, data, error, isLoading, resetState});
}

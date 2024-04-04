import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import PageCountSelector from "./PageCountSelector";
import TableContent from "./TableContent";
import TableHeaders from "./TableHeaders";
import useTagData from "../hooks/useTagData";

export default function DataTable() {
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRows,
    handleRequestSort,
    data,
    error,
    isLoading,
    resetState,
  } = useTagData();

  return (
    <>
      <PageCountSelector
        rows={rowsPerPage}
        handleChangeRows={handleChangeRows}
      />

      <TableContainer sx={{ position: "relative" }}>
        <Table stickyHeader aria-labelledby="Tag data" size="medium">
          <TableHeaders
            order={order}
            orderBy={orderBy}
            handleSort={handleRequestSort}
          />
          <TableContent
            error={error}
            data={data}
            resetState={resetState}
            isLoading={isLoading}
            rows={rowsPerPage}
          />
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

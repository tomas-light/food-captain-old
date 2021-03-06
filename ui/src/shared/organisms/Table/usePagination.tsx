import TablePagination from '@material-ui/core/TablePagination';
import React, { ReactElement } from 'react';

type ChangePageEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | null;
type ChangeRowsPerPageEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type HookReturnType = [ReactElement, number, number];

function usePagination(amount: number, rowsPerPage: number, rowsPerPageOptions: number[]): HookReturnType {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(rowsPerPage);

  const handleChangePage = (event: ChangePageEvent, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeRowsPerPageEvent) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const PaginationComponent = (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={amount}
      rowsPerPage={pageSize}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  return [
    PaginationComponent,
    page,
    pageSize,
  ];
}

export { usePagination };

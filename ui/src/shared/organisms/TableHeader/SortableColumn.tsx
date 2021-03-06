import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';
import { OrderVariant } from '@utils/types';

const useStyles = makeStyles({
  padding: {
    padding: '10px 12px',
  },
});

interface SortableColumnProps {
  column: ColumnSettings;
  order: OrderVariant;
  orderBy: string;
}

interface SortableColumnCallProps {
  onSort: (event: MouseEvent) => void;
}

type Props = SortableColumnProps & SortableColumnCallProps;

const SortableColumn = (props: Props) => {
  const {
    column,
    order,
    orderBy,
    onSort,
  } = props;
  const classes = useStyles();

  return (
    <TableCell
      key={column.propertyName}
      align={column.isNumeric ? 'right' : 'left'}
      padding={column.disablePadding ? 'none' : 'default'}
      sortDirection={column.sortable && orderBy === column.propertyName ? order : false}
      className={clsx({
        [classes.padding]: !column.disablePadding,
      })}
      style={column.style}
    >
      <TableSortLabel
        active={orderBy === column.propertyName}
        direction={orderBy === column.propertyName ? order : 'asc'}
        onClick={onSort}
      >
        {column.label}
      </TableSortLabel>
    </TableCell>
  );
};

export { SortableColumn };



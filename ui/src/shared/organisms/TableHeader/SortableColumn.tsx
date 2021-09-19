import clsx from 'clsx';
import { MouseEvent } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { makeStyles } from '@shared/theme';
import { OrderVariant } from '@utils/types';
import { ColumnSettings } from '../Table/models';

const useStyles = makeStyles({
  padding: {
    padding: '10px 12px',
  },
});

type Props = {
  column: ColumnSettings;
  order: OrderVariant;
  orderBy: string;
  onSort: (event: MouseEvent) => void;
};

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
      padding={column.disablePadding ? 'none' : 'normal'}
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

export type { Props as SortableColumnProps };
export { SortableColumn };

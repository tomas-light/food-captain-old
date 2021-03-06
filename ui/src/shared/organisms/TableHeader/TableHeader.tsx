import React, { MouseEvent, ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';
import { OrderVariant } from '@utils/types';
import { Column } from './Column';
import { SortableColumn } from './SortableColumn';

interface TableHeaderProps {
  columns: ColumnSettings[];

  selectable?: boolean;
  rowCount?: number;
  selectedRowCount?: number;

  order?: OrderVariant;
  orderBy?: string;
}

interface TableHeaderCallProps {
  onSort?: (event: MouseEvent, propertyName: string) => void;
  onCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type Props = TableHeaderProps & TableHeaderCallProps;

function TableHeader(props: Props) {
  const {
    columns,

    selectable = false,
    rowCount = 0,
    selectedRowCount = 0,
    onCheck,

    order,
    orderBy,
    onSort,
  } = props;

  const createSortHandler = (propertyName: string) => (event: MouseEvent) => {
    if (typeof onSort === 'function') {
      onSort(event, propertyName);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedRowCount > 0 && selectedRowCount < rowCount}
              checked={rowCount > 0 && selectedRowCount === rowCount}
              onChange={onCheck}
              inputProps={{ 'aria-label': 'select all rows' }}
              color="secondary"
            />
          </TableCell>
        )}

        {columns.map((column: ColumnSettings) => column.sortable
          ? (
            <SortableColumn
              key={`header-${column.propertyName}`}
              column={column}
              order={order}
              orderBy={orderBy}
              onSort={createSortHandler(column.propertyName)}
            />
          )
          : (
            <Column
              column={column}
              key={`header-${column.propertyName}`}
            />
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export { TableHeader };

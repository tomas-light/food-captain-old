import React, { SyntheticEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';

interface SelectableRowProps {
  columns: ColumnSettings[];
  row: any;
  selectedRows: any[];
}

interface SelectableRowCallProps {
  onRowClick: (event: SyntheticEvent<HTMLTableRowElement, MouseEvent>) => void;
}

type Props = SelectableRowProps & SelectableRowCallProps;

const SelectableRow = (props: Props) => {
  const {
    columns,
    row,
    selectedRows,
    onRowClick,
  } = props;
  const selected = selectedRows.indexOf(row) !== -1;

  return (
    <MuiTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={onRowClick}
      aria-checked={selected}
      selected={selected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} color="secondary"/>
      </TableCell>

      {columns.map(column => (
        <TableCell
          key={`cell-${column.propertyName}`}
          align={column.isNumeric ? 'right' : 'left'}
          padding={column.disablePadding ? 'none' : 'default'}
        >
          {column.Component
            ? (
              <column.Component>
                {row[column.propertyName]}
              </column.Component>
            )
            : row[column.propertyName]}
        </TableCell>
      ))}
    </MuiTableRow>
  );
};

export { SelectableRow };

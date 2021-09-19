import React from 'react';

import { ColumnSettings } from '../Table/models';
import { SelectableRow } from './SelectableRow';
import { Row } from './Row';

type Props = {
  columns: ColumnSettings[];
  row: any;
  selectable?: boolean;
  selectedRows: any[];
  onRowClick?: (row: any) => void;
};

const TableRow = (props: Props) => {
  const {
    columns,
    row,
    selectable = false,
    selectedRows,
    onRowClick,
  } = props;

  if (selectable) {
    if (!onRowClick) {
      throw new Error('onRowClick property is required for selectable rows');
    }

    return (
      <SelectableRow
        columns={columns}
        row={row}
        selectedRows={selectedRows}
        onRowClick={() => onRowClick(row)}
      />
    );
  }

  return (
    <Row
      columns={columns}
      row={row}
    />
  );
};

export type { Props as TableRowProps };
export { TableRow };

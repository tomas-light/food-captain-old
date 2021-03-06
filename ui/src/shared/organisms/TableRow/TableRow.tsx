import React from 'react';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';
import { SelectableRow } from './SelectableRow';
import { Row } from './Row';

interface TableRowProps {
  columns: ColumnSettings[];
  row: any;
  selectable?: boolean;
  selectedRows: any[];
}

interface TableRowCallProps {
  onRowClick?: (row: any) => void;
}

type Props = TableRowProps & TableRowCallProps;

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

export { TableRow };

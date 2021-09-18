import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@shared/theme';
import TableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';

const useStyles = makeStyles({
  padding: {
    padding: '10px 12px',
  },
});

interface RowProps {
  columns: ColumnSettings[];
  row: any;
}

type Props = RowProps;

const Row = (props: Props) => {
  const { columns, row } = props;
  const classes = useStyles();

  return (
    <MuiTableRow>
      {columns.map(column => (
        <TableCell
          key={`cell-${column.propertyName}`}
          align={column.isNumeric ? 'right' : 'left'}
          padding={column.disablePadding ? 'none' : 'default'}
          className={clsx({
            [classes.padding]: !column.disablePadding,
          })}
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

export { Row };

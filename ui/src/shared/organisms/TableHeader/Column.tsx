import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@shared/theme';
import TableCell from '@material-ui/core/TableCell';

import { ColumnSettings } from '@shared/designOrganisms/Table/models';

const useStyles = makeStyles({
  padding: {
    padding: '10px 12px',
  },
});

interface ColumnProps {
  column: ColumnSettings;
}

type Props = ColumnProps;

const Column = (props: Props) => {
  const { column } = props;
  const classes = useStyles();

  return (
    <TableCell
      key={column.propertyName}
      align={column.isNumeric ? 'right' : 'left'}
      padding={column.disablePadding ? 'none' : 'default'}
      className={clsx({
        [classes.padding]: !column.disablePadding,
      })}
      style={column.style}
    >
      {column.label}
    </TableCell>
  );
};

export { Column };



import React, { CSSProperties, ReactElement } from 'react';
import { StyledComponentProps } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@shared/theme';

import { OrderVariant } from '@utils/types';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import { ColumnSettings } from './models';
import { OnSortClick } from './useOrdering';

type ClassKey =
  | 'paper'
  | 'toolbar'
  ;

interface TableProps {
  columns: ColumnSettings[];
  rows: any[];
  rowLength?: number;
  idPropertyName: string;
  title: string | ReactElement;

  order?: OrderVariant;
  orderBy?: string;

  selectable?: boolean;
  selectedRows?: any[];
  selectedTitle?: string | ReactElement;

  Pagination?: ReactElement;
  style?: CSSProperties;
  className?: string;
}

interface TableCallProps {
  onRowClick?: (row: any) => void;
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSort?: OnSortClick<any>;
}

type Props = TableProps & TableCallProps & StyledComponentProps<ClassKey>;

const Table = (props: Props) => {
  const {
    columns,
    rows,
    rowLength,
    idPropertyName,
    title,

    order,
    orderBy,
    onSort,

    selectable = false,
    selectedRows = [],
    selectedTitle,
    onRowClick,
    onSelectAll,

    Pagination,
    style,
    className,
    classes,
  } = props;

  return (
    <Paper classes={{ root: classes.paper }} className={className} style={style}>
      <Toolbar classes={{ root: classes.toolbar }} disableGutters>
        {selectedRows.length
          ? selectedTitle || title
          : title
        }
      </Toolbar>

      <TableContainer>
        <MuiTable size="medium">
          <TableHeader
            columns={columns}

            selectable={selectable}
            selectedRowCount={selectedRows.length}
            rowCount={rowLength || rows.length}
            onCheck={onSelectAll}

            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`table-row-${row[idPropertyName] ? row[idPropertyName] : index}`}
                columns={columns}
                row={row}
                selectable={selectable}
                selectedRows={selectedRows}
                onRowClick={onRowClick}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {Pagination}
    </Paper>
  );
};

const componentWithStyles = withStyles<ClassKey, Props>(theme => ({
  paper: {
    width: '100%',
  },
  toolbar: {
    backgroundColor: props => props.selectedRows && props.selectedRows.length
      ? theme.colors.secondary.outline.hover
      : 'transparent',
  },
}))(Table);
export { componentWithStyles as Table };
export type { ClassKey as TableClassKey };
